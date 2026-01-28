import { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageSquare,
  Phone,
  Archive,
  MoreHorizontal,
  Send,
  PanelRightOpen,
  Bot,
  User,
  Paperclip,
  Smile,
} from "lucide-react";
import type { Lead, Message } from "@/types/dashboard";

interface ConversationViewProps {
  lead: Lead | null;
  messages: Message[];
  onSendMessage: (content: string, channel: "email" | "sms" | "whatsapp") => void;
  onToggleDetails: () => void;
}

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  whatsapp: Phone,
};

const channelColors = {
  email: "bg-blue-500",
  sms: "bg-green-500",
  whatsapp: "bg-emerald-500",
};

export function ConversationView({
  lead,
  messages,
  onSendMessage,
  onToggleDetails,
}: ConversationViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const [activeChannel, setActiveChannel] = useState<"email" | "sms" | "whatsapp">("email");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage, activeChannel);
    setNewMessage("");
  };

  if (!lead) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">
            Välj en konversation
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Klicka på en lead för att se konversationen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-medium">
              {lead.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{lead.name}</h2>
            <p className="text-xs text-muted-foreground">{lead.company}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Archive className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleDetails}>
            <PanelRightOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Conversation started */}
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
              <span>Konversation startad</span>
              <span>•</span>
              <span>{format(messages[0]?.timestamp || new Date(), "d MMM yyyy", { locale: sv })}</span>
            </div>
          </div>

          {messages.map((message) => {
            const ChannelIcon = channelIcons[message.channel];
            const isLead = message.sender === "lead";
            const isAI = message.sender === "ai";

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  !isLead && "flex-row-reverse"
                )}
              >
                {/* Avatar */}
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback
                    className={cn(
                      "text-xs font-medium",
                      isLead
                        ? "bg-gradient-to-br from-primary to-accent text-white"
                        : isAI
                        ? "bg-muted text-muted-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {isLead ? lead.avatar : isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message bubble */}
                <div
                  className={cn(
                    "max-w-md",
                    !isLead && "text-right"
                  )}
                >
                  <div
                    className={cn(
                      "inline-block px-4 py-3 rounded-2xl",
                      isLead
                        ? "bg-muted rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 mt-1 text-xs text-muted-foreground",
                    !isLead && "justify-end"
                  )}>
                    <div className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center",
                      channelColors[message.channel]
                    )}>
                      <ChannelIcon className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span>
                      {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: sv })}
                    </span>
                    {isAI && (
                      <Badge variant="secondary" className="text-xs py-0">
                        AI
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Channel tabs + Input */}
      <div className="border-t border-border p-4">
        {/* Channel selector */}
        <div className="flex items-center gap-2 mb-3">
          {(["sms", "email"] as const).map((channel) => {
            const Icon = channelIcons[channel];
            return (
              <button
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  activeChannel === channel
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {channel === "email" ? "Email" : "SMS"}
              </button>
            );
          })}
        </div>

        {/* Message input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Skriv ett meddelande..."
              className="min-h-[80px] pr-24 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            className="self-end"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
