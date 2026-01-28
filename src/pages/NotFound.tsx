import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-8xl font-display font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sidan du letar efter finns inte.
        </p>
        <Link to="/">
          <Button variant="premium" size="lg">
            <Home className="w-4 h-4" />
            Tillbaka till startsidan
          </Button>
        </Link>
      </div>
    </div>
  );
}
