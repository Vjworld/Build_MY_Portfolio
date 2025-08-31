import { Play, Youtube } from "lucide-react";

interface VideoData {
  title: string;
  url: string;
  embedId: string;
  description: string;
}

const videos: VideoData[] = [
  {
    title: "Discover the New Ruvab IT Website",
    url: "https://youtube.com/shorts/VQ5GYuvCiXk",
    embedId: "VQ5GYuvCiXk",
    description: "Explore the innovative features and capabilities of our redesigned Ruvab IT platform"
  },
  {
    title: "LangScribe - Multilingual Voice Typing & OCR Transcription",
    url: "https://youtube.com/shorts/jE525mELH2I",
    embedId: "jE525mELH2I",
    description: "AI-powered writing assistant that transforms content creation with voice typing and OCR"
  },
  {
    title: "TrendSolver - AI-Powered Trend Analysis & Content Creation Platform",
    url: "https://youtube.com/shorts/wCrILvU-wOk",
    embedId: "wCrILvU-wOk",
    description: "Turn trends into instant solutions with real-time data and AI insights"
  },
  {
    title: "FYPPAL - Find Your Passion Pal",
    url: "https://youtube.com/shorts/CExpm0vTav8",
    embedId: "CExpm0vTav8",
    description: "Transform your IT experience into freelance opportunities with personalized guidance"
  },
  {
    title: "QR Code Generator Pro by Ruvab IT",
    url: "https://youtube.com/shorts/XG9ppxzAsPA",
    embedId: "XG9ppxzAsPA",
    description: "Professional QR code generation with advanced customization and analytics"
  }
];

export default function YouTubeVideosSection() {
  return (
    <section id="product-videos" className="py-20 bg-gradient-to-br from-background via-achievement-light/5 to-red-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-achievement/10 rounded-full blur-2xl"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative z-10">
          <div className="achievement-badge mx-auto mb-6 bg-red-500 text-white">
            <Play className="h-4 w-4 mr-2" />
            Video Showcase
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold premium-gradient">
              Product Launch Videos
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch our latest product launches and discover how our innovative solutions 
            are transforming businesses across various industries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div 
              key={index}
              className="professional-card overflow-hidden group achievement-highlight"
            >
              <div className="relative aspect-[9/16] bg-gray-100">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
                    data-testid={`link-youtube-${index}`}
                  >
                    <Play className="h-4 w-4" />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 relative z-10">
          <div className="professional-card bg-gradient-to-br from-red-500/10 to-achievement/10 p-8 max-w-2xl mx-auto achievement-highlight border-2 border-red-500/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Youtube className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-semibold premium-gradient">
                Subscribe for More Updates
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Stay updated with our latest product launches and feature demonstrations.
            </p>
            <a
              href="https://www.youtube.com/@RuvabIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 achievement-highlight"
              data-testid="button-youtube-subscribe"
            >
              <Youtube className="h-4 w-4" />
              Visit YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}