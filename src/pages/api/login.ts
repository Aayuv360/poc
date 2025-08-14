import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../utils/theme";
import { setSessionCookie } from "../../lib/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { username } = req.body;
  const customerKey = authenticate(username);
  if (!customerKey) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  setSessionCookie(res, customerKey);
  return res.status(200).json({ ok: true });
}
