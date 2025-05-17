import * as bcrypt from 'bcrypt';

export async function encrypt(data: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const encryptData = await bcrypt.hash(data, salt);
  return encryptData;
}

export async function compare(
  data: string,
  encryptData: string,
): Promise<boolean> {
  if (!encryptData) return false;
  return bcrypt.compare(data, encryptData);
}
