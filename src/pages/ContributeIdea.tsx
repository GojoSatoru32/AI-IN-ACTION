import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Lightbulb, 
  Users, 
  Globe, 
  BookOpen, 
  DollarSign,
  Settings,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const contributionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  category: z.enum(['policy', 'community', 'technology', 'education', 'economic']),
  author: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  region: z.string().optional(),
  implementationLevel: z.enum(['local', 'national', 'regional', 'global']),
  resources: z.string().min(10, 'Please describe the resources needed'),
  expectedImpact: z.string().min(20, 'Please describe the expected impact'),
});

type ContributionForm = z.infer<typeof contributionSchema>;

const categories = [
  { id: 'policy', label: 'Policy & Governance', icon: Settings, color: 'bg-blue-500' },
  { id: 'community', label: 'Community Engagement', icon: Users, color: 'bg-green-500' },
  { id: 'technology', label: 'Technology Solutions', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'education', label: 'Education & Awareness', icon: BookOpen, color: 'bg-orange-500' },
  { id: 'economic', label: 'Economic Development', icon: DollarSign, color: 'bg-teal-500' },
];

const implementationLevels = [
  { id: 'local', label: 'Local Community', description: 'Neighborhood or city level' },
  { id: 'national', label: 'National', description: 'Country-wide implementation' },
  { id: 'regional', label: 'Regional', description: 'Multi-country or continental' },
  { id: 'global', label: 'Global', description: 'Worldwide application' },
];

export function ContributeIdea() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContributionForm>({
    resolver: zodResolver(contributionSchema),
  });

  const onSubmit = async (data: ContributionForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contribution submitted:', data);
      setSubmitted(true);
      toast.success('Your idea has been submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit your idea. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-0">
              <CardContent className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                  Your peace-building idea has been submitted successfully. Our team will review it and get back to you soon.
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => {
                      setSubmitted(false);
                      window.location.reload();
                    }}
                    variant="outline"
                    className="mr-4"
                  >
                    Submit Another Idea
                  </Button>
                  <Button onClick={() => window.location.href = '/'}>
                    Back to Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
              Contribute Your Idea
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your innovative ideas for conflict resolution and peacebuilding. Every contribution matters in building a more peaceful world.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 h-5 text-blue-500" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Idea Title *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Enter a compelling title for your idea"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Target Region (Optional)</Label>
                    <Input
                      id="region"
                      {...register('region')}
                      placeholder="e.g., Middle East, West Africa"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    rows={5}
                    placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
                    className="bg-white/50 dark:bg-gray-800/50"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Category Selection */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select the category that best describes your idea
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setValue('category', category.id as any);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 ${category.color} rounded-lg`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">{category.label}</h3>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-2">{errors.category.message}</p>
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Implementation Details */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Implementation Level *</Label>
                  <RadioGroup
                    onValueChange={(value) => setValue('implementationLevel', value as any)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {implementationLevels.map((level) => (
                        <div key={level.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={level.id} id={level.id} />
                            <Label htmlFor={level.id} className="font-medium">
                              {level.label}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                            {level.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {errors.implementationLevel && (
                    <p className="text-sm text-red-500">{errors.implementationLevel.message}</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="resources">Required Resources *</Label>
                  <Textarea
                    id="resources"
                    {...register('resources')}
                    rows={3}
                    placeholder="What resources would be needed to implement this idea? (funding, personnel, technology, etc.)"
                    className="bg-white/50 dark:bg-gray-800/50"
                  />
                  {errors.resources && (
                    <p className="text-sm text-red-500">{errors.resources.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedImpact">Expected Impact *</Label>
                  <Textarea
                    id="expectedImpact"
                    {...register('expectedImpact')}
                    rows={3}
                    placeholder="What positive impact do you expect this idea to have? How would success be measured?"
                    className="bg-white/50 dark:bg-gray-800/50"
                  />
                  {errors.expectedImpact && (
                    <p className="text-sm text-red-500">{errors.expectedImpact.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We'll use this information to follow up with you about your submission
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author">Your Name *</Label>
                    <Input
                      id="author"
                      {...register('author')}
                      placeholder="Enter your full name"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                    {errors.author && (
                      <p className="text-sm text-red-500">{errors.author.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your.email@example.com"
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Submit Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Submit Your Idea
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}