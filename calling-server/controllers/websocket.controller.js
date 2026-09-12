const moment = require('moment-timezone');
const { log } = require('../utils/logger.util');
const { CALL_EVENTS, CALL_STATUS, TIMEZONES } = require('../constants');

const activeCalls = new Map();
const connectedPeers = new Map();

/**
 * WebSocket Controller for Call Signaling & Real-time Media
 * @param {import('ws').WebSocketServer} wss 
 */
module.exports = (wss) => {
    wss.on('connection', (ws, req) => {
        const peerId = req.headers['sec-websocket-key'] || `peer_${moment().valueOf()}`;
        connectedPeers.set(peerId, ws);
        console.log(`[Calling WebSocket] Peer connected: ${peerId} (Total: ${connectedPeers.size})`);

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const { event, targetPeerId, payload, callId } = data;

                switch (event) {
                    case CALL_EVENTS.PING:
                        ws.send(JSON.stringify({ event: CALL_EVENTS.PONG, timestamp: moment().valueOf() }));
                        break;

                    case CALL_EVENTS.CALL_INITIATE:
                        activeCalls.set(callId, {
                            caller: peerId,
                            callee: targetPeerId,
                            status: CALL_STATUS.INITIATED,
                            startedAt: moment().tz(TIMEZONES.DEFAULT).toDate(),
                        });
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event: CALL_EVENTS.CALL_INCOMING,
                                callerId: peerId,
                                callId,
                                payload,
                            }));
                        }
                        break;

                    case CALL_EVENTS.CALL_OFFER:
                    case CALL_EVENTS.CALL_ANSWER:
                    case CALL_EVENTS.CALL_CANDIDATE:
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event,
                                fromPeerId: peerId,
                                payload,
                            }));
                        }
                        break;

                    case CALL_EVENTS.CALL_HANGUP:
                        if (callId && activeCalls.has(callId)) {
                            const call = activeCalls.get(callId);
                            call.status = CALL_STATUS.COMPLETED;
                            activeCalls.delete(callId);
                        }
                        if (targetPeerId && connectedPeers.has(targetPeerId)) {
                            connectedPeers.get(targetPeerId).send(JSON.stringify({
                                event: CALL_EVENTS.CALL_HANGUP,
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
