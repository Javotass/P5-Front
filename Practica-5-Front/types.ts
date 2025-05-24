export type Contact = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    chatId: string;
  };
  
  export type Message = {
    _id: string;
    chatId: string;
    isContactMessage: boolean;
    content: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type Chat = {
    _id: string;
    messageIds: Message[];
    lastMessage: Message;
    unreadCount: number;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    contact: Contact;
  };
  