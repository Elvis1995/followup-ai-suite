import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
  Tag,
  Plus,
  ExternalLink,
} from "lucide-react";
import type { Lead } from "@/types/dashboard";

interface ContactDetailsProps {
  lead: Lead;
  onClose: () => void;
}

export function ContactDetails({ lead, onClose }: ContactDetailsProps) {
  return (
    <div className="w-80 border-l border-border bg-card/50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Kontaktinfo</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile */}
          <div className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-3">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-2xl font-medium">
                {lead.avatar}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-lg font-semibold">{lead.name}</h4>
            {lead.company && (
              <p className="text-sm text-muted-foreground">{lead.company}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Calendar className="w-4 h-4 mr-1" />
              Boka möte
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-1" />
              Öppna
            </Button>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Kontaktuppgifter
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{lead.email}</p>
                  <p className="text-xs text-muted-foreground">Email</p>
                </div>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{lead.phone}</p>
                    <p className="text-xs text-muted-foreground">Telefon</p>
                  </div>
                </div>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">Företag</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Taggar
              </h5>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {lead.tags.length > 0 ? (
                lead.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Inga taggar</p>
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-3">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Aktivitet
            </h5>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm">Senaste meddelande</p>
                <p className="text-xs text-muted-foreground">
                  {format(lead.lastMessageTime, "d MMMM yyyy 'kl' HH:mm", { locale: sv })}
                </p>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Aktiva kampanjer
              </h5>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="p-3 rounded-lg border border-dashed border-border text-center">
              <p className="text-sm text-muted-foreground">
                Inga aktiva kampanjer
              </p>
              <Button variant="link" size="sm" className="text-xs mt-1">
                Lägg till kampanj
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer actions */}
      <div className="p-4 border-t border-border">
        <Button variant="destructive" size="sm" className="w-full">
          Markera som avslutad
        </Button>
      </div>
    </div>
  );
}
