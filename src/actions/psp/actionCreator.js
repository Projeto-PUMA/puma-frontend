export const loadPSPs = psps => ({
  type: "LOAD_PSPS",
  psps: psps ? psps.data : null
});