export const uuidToUint256 = (uuid) =>
  BigInt("0x" + uuid.replace(/-/g, "")).toString();
