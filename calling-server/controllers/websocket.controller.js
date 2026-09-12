const { log } = require('../utils/logger.util');

const activeCalls = new Map();
const connectedPeers = new Map();

/**
 * WebSocket Controller for Call Signaling & Real-time Media
 * @param {import('ws').WebSocketServer} wss 
 */
module.exports = (wss) => {
    wss.on('connection', (ws, req) => {
        const peerId = req.headers['sec-websocket-key'] || `peer_${Date.now()}`;
        connectedPeers.set(peerId, ws);
        console.log(`[Calling WebSocket] Peer connected: ${peerId} (Total: ${connectedPeers.size})`);

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const { event, targetPeerId, payload, callId } = data;

                switch (event) {
                    case 'ping':
                        ws.send(JSON.stringify({ event: 'pong', timestamp: Date.now() }));
                        break;

                    case 'call:initiate':
                        activeCalls.set(callId, {
                            caller: peerId,
                            callee: targetPeerId,
                            status: 'INITIATED',
                            startedAt: new Date(),
                        });
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event: 'call:incoming',
                                callerId: peerId,
                                callId,
                                payload,
                            }));
                        }
                        break;

                    case 'call:offer':
                    case 'call:answer':
                    case 'call:candidate':
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event,
                                fromPeerId: peerId,
                                payload,
                            }));
                        }
                        break;

                    case 'call:hangup':
                        if (callId && activeCalls.has(callId)) {
                            const call = activeCalls.get(callId);
                            call.status = 'COMPLETED';
                            activeCalls.delete(callId);
                        }
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event: 'call:hangup',
                                fromPeerId: peerId,
                                callId,
                            }));
                        }
                        break;

                    default:
                        console.log(`[Calling WebSocket] Received event "${event}" from ${peerId}`);
                        break;
                }
            } catch (err) {
                log('websocket.controller -> message', err, { peerId });
            }
        });

        ws.on('close', () => {
            connectedPeers.delete(peerId);
            console.log(`[Calling WebSocket] Peer disconnected: ${peerId} (Remaining: ${connectedPeers.size})`);
        });

        ws.on('error', (err) => {
            log('websocket.controller -> peer error', err, { peerId });
        });
    });
};
