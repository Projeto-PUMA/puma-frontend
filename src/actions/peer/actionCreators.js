export const loadPeers = peers => ({
  type: 'LOAD_PEERS',
  peers: peers ? peers.data : null,
});