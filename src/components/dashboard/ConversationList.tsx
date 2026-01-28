import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Flame, Sparkles } from "lucide-react";
import type { Lead } from "@/types/dashboard";

interface ConversationListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
  filter: "all" | "unread" | "hot" | "new";
  onFilterChange: (filter: "all" | "unread" | "hot" | "new") => void;
}

const filterTabs: Array<{ id: "all" | "unread" | "hot" | "new"; label: string; icon?: typeof Flame }> = [
  { id: "all", label: "Alla" },
  { id: "unread", label: "Olästa" },
  { id: "hot", label: "Heta", icon: Flame },
  { id: "new", label: "Nya", icon: Sparkles },
];

const statusColors = {
  new: "bg-primary",
  hot: "bg-orange-500",
  warm: "bg-yellow-500",
  cold: "bg-blue-400",
};

export function ConversationList({
  leads,
  selectedLead,
  onSelectLead,
  filter,
  onFilterChange,
}: ConversationListProps) {
  return (
    <div className="w-80 border-r border-border flex flex-col bg-card/50">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Konversationer</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Sök konversationer..."
            className="pl-9 bg-background"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mt-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-all",
                filter === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab.icon && <tab.icon className="w-3 h-3 inline mr-1" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {leads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className={cn(
                "w-full p-3 rounded-xl text-left transition-all duration-200 mb-1",
                selectedLead?.id === lead.id
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-muted/50"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Avatar with status indicator */}
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-medium">
                      {lead.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                      statusColors[lead.status]
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name and time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("font-medium truncate", lead.unread && "font-semibold")}>
                      {lead.name}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(lead.lastMessageTime, {
                        addSuffix: false,
                        locale: sv,
                      })}
                    </span>
                  </div>

                  {/* Company */}
                  {lead.company && (
                    <div className="text-xs text-muted-foreground truncate">
                      {lead.company}
                    </div>
                  )}

                  {/* Last message */}
                  <div
                    className={cn(
                      "text-sm mt-1 line-clamp-2",
                      lead.unread ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {lead.lastMessage}
                  </div>

                  {/* Tags */}
                  {lead.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {lead.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs py-0 px-2"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Unread indicator */}
                {lead.unread && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
