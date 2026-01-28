export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "new" | "hot" | "warm" | "cold";
  lastMessage: string;
  lastMessageTime: Date;
  unread: boolean;
  avatar: string;
  tags: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: "lead" | "ai" | "user";
  timestamp: Date;
  channel: "email" | "sms" | "whatsapp";
}
