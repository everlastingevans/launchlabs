export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
};

const users: User[] = [
  {
    id: "admin-1",
    name: "Administrator",
    email: "admin@example.com",
    passwordHash: "",
    role: "ADMIN",
  },
];

export async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(
  password: string,
  passwordHash: string
) {
  const hashedPassword = await hashPassword(password);

  return hashedPassword === passwordHash;
}

export function findUserByEmail(email: string) {
  return users.find(
    (user) => user.email === email.toLowerCase().trim()
  );
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const passwordHash = await hashPassword(password);

  const user: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "USER",
  };

  users.push(user);

  return user;
}