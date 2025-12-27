import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image-1');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">College Timetable Ace</h1>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/login">Admin/Faculty Login</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover -z-10"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-foreground">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">
              Effortless Scheduling for Modern Institutions
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-foreground/80">
              Streamline your academic scheduling with our intelligent, real-time timetable generator.
            </p>
            <Button asChild size="lg">
              <Link href="/schedule">
                View Public Schedules <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">For Students</h4>
                <p className="text-muted-foreground">Instant, unrestricted access to all class schedules. No login required.</p>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">For Faculty</h4>
                <p className="text-muted-foreground">Review your personal timetable, and export it for your calendar or for printing.</p>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">For Admins</h4>
                <p className="text-muted-foreground">Generate, manage, and publish timetables with a powerful and intuitive dashboard.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} College Timetable Ace. All rights reserved.</p>
      </footer>
    </div>
  );
}
