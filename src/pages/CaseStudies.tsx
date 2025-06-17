import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { caseStudies } from '@/data/conflictData';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Clock
} from 'lucide-react';

export function CaseStudies() {
  const { id } = useParams();

  if (id) {
    return <CaseStudyDetail id={id} />;
  }

  return <CaseStudiesList />;
}

function CaseStudiesList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Peace Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from successful peace processes and understand the complexities of conflict resolution through detailed case studies.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.images[0]}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      className={`
                        ${study.status === 'resolved' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : study.status === 'ongoing'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-orange-500 hover:bg-orange-600'
                        }
                      `}
                    >
                      {study.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {study.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {study.subtitle}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{study.region}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(study.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Key Players</span>
                      </div>
                      <div className="text-sm font-semibold">{study.keyPlayers.length}</div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Outcomes</span>
                      </div>
                      <div className="text-sm font-semibold">{study.outcomes.length}</div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/case-studies/${study.id}`}>
                      <Button className="w-full group">
                        Read Full Study
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5 backdrop-blur-sm border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Share Your Peace Story</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Have insights from your own peace-building experience? We'd love to feature your story and help others learn from your journey.
              </p>
              <Link to="/contribute">
                <Button size="lg">
                  Contribute Your Story
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function CaseStudyDetail({ id }: { id: string }) {
  const study = caseStudies.find(s => s.id === id);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getOutcomeIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'conflict':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'intervention':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'breakthrough':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/case-studies">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Studies
          </Button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
            <img
              src={study.images[0]}
              alt={study.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{study.title}</h1>
              <p className="text-xl opacity-90">{study.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge 
              className={`
                ${study.status === 'resolved' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : study.status === 'ongoing'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-orange-500 hover:bg-orange-600'
                }
              `}
            >
              {study.status}
            </Badge>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{study.region}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Updated {new Date(study.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-12">
          {/* Story */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>The Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {study.fullStory}
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Timeline of Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {study.timeline.map((event, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{event.event}</h4>
                          <Badge variant="outline" className="text-xs">
                            {new Date(event.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Key Players & Outcomes */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Players */}
            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0 h-full">
                <CardHeader>
                  <CardTitle>Key Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {study.keyPlayers.map((player, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold mb-1">{player.name}</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                          {player.role}
                          {player.organization && ` • ${player.organization}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {player.contribution}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Outcomes */}
            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0 h-full">
                <CardHeader>
                  <CardTitle>Outcomes & Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {study.outcomes.map((outcome, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          {getOutcomeIcon(outcome.impact)}
                          <h4 className="font-semibold">{outcome.category}</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {outcome.description}
                        </p>
                        {outcome.metrics && (
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {outcome.metrics}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Lessons Learned */}
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border-0">
              <CardHeader>
                <CardTitle>Lessons Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {study.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{lesson}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}