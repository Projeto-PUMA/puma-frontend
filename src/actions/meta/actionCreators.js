export const syncOperationLoading = () => ({
  type: 'SYNC_OPERATION_LOADING',
});

export const syncOperationFinished = result => ({
  type: 'SYNC_OPERATION_FINISHED',
  result: result,
});