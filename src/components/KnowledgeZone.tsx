
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  Clock, 
  BookOpen,
  ArrowRight,
  Lightbulb,
  ArrowLeft
} from "lucide-react";

export const KnowledgeZone = () => {
  const [currentView, setCurrentView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const dailyTip = {
    title: "Master Your Morning Routine",
    content: "The first hour of your day sets the tone for everything that follows. Winners wake up early, not because they have to, but because they choose to own their time. Start with a cold shower, exercise, or meditation. This isn't about comfort—it's about building the discipline that separates strong men from the weak.",
    category: "Discipline",
    readTime: "2 min read"
  };

  const knowledgeCategories = [
    {
      id: 1,
      title: "Mental Strength",
      description: "Build resilience and emotional control",
      icon: Brain,
      color: "bg-purple-100 text-purple-700",
      articles: 12
    },
    {
      id: 2,
      title: "Social Skills",
      description: "Leadership and communication mastery",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
      articles: 8
    },
    {
      id: 3,
      title: "Emotional Intelligence",
      description: "Understand and control your emotions",
      icon: Heart,
      color: "bg-red-100 text-red-700",
      articles: 15
    },
    {
      id: 4,
      title: "Goal Setting",
      description: "Strategic planning and execution",
      icon: Target,
      color: "bg-green-100 text-green-700",
      articles: 10
    }
  ];

  const allArticles = [
    {
      title: "How to Handle Criticism Like a Man",
      category: "Mental Strength",
      readTime: "3 min",
      excerpt: "Turn criticism into fuel for growth instead of letting it break you down."
    },
    {
      title: "The Power of Saying No",
      category: "Social Skills",
      readTime: "4 min",
      excerpt: "Boundaries are not walls—they're the foundation of respect."
    },
    {
      title: "Building Unshakeable Confidence",
      category: "Mental Strength",
      readTime: "5 min",
      excerpt: "Confidence isn't about being loud. It's about knowing who you are."
    },
    {
      title: "Leading by Example",
      category: "Social Skills",
      readTime: "6 min",
      excerpt: "True leadership is about inspiring others through your actions."
    },
    {
      title: "Managing Anger Effectively",
      category: "Emotional Intelligence",
      readTime: "4 min",
      excerpt: "Channel your anger into productive energy instead of destructive force."
    },
    {
      title: "Setting SMART Goals",
      category: "Goal Setting",
      readTime: "7 min",
      excerpt: "Learn the framework that turns dreams into achievable milestones."
    },
    {
      title: "The Art of Active Listening",
      category: "Social Skills",
      readTime: "5 min",
      excerpt: "Master this skill to build deeper connections and understand others."
    },
    {
      title: "Overcoming Fear of Failure",
      category: "Mental Strength",
      readTime: "6 min",
      excerpt: "Failure is not the opposite of success—it's a stepping stone to it."
    }
  ];

  const getFilteredArticles = () => {
    if (selectedCategory) {
      return allArticles.filter(article => article.category === selectedCategory);
    }
    return allArticles;
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category.title);
    setCurrentView("articles");
  };

  const handleBrowseAllClick = () => {
    setSelectedCategory(null);
    setCurrentView("articles");
  };

  if (currentView === "articles") {
    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentView("main")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory || "All Articles"}
            </h1>
            <p className="text-gray-600">
              {selectedCategory ? `Articles in ${selectedCategory}` : "Browse all knowledge articles"}
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {getFilteredArticles().map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 ml-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Knowledge Zone</h1>
        <p className="text-gray-600">Develop wisdom, build character, become stronger</p>
      </div>

      {/* Daily Tip */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Lightbulb className="h-5 w-5" />
              Daily Wisdom
            </CardTitle>
            <Badge variant="secondary">{dailyTip.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{dailyTip.title}</h3>
            <p className="text-gray-700 leading-relaxed">{dailyTip.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {dailyTip.readTime}
              </div>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Mark as Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledgeCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${category.color.replace('text-', 'bg-').replace('-700', '-100')}`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        <span className="text-xs text-gray-500">{category.articles} articles</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Articles */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Articles</h2>
        <div className="space-y-4">
          {allArticles.slice(0, 3).map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-gray-900 to-black text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Level Up?</h3>
          <p className="text-gray-300 mb-6">
            Knowledge without action is worthless. Start applying what you learn today.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleBrowseAllClick}
          >
            Browse All Articles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
