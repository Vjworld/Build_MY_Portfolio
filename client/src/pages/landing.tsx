import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <Card className="w-full max-w-2xl">
            <CardContent className="pt-16 pb-16">
              <div className="mb-8">
                <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-primary">
                  Vaibhav Selukar
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Professional Portfolio & Blog Platform
                </p>
                <p className="text-muted-foreground mb-8">
                  A visionary leader, bridging the gap between technology and business to create meaningful impact.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-login"
                >
                  Sign In to Continue
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Access your portfolio dashboard and manage your professional content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
