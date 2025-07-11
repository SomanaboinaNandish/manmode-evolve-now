import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Brain, 
  Heart, 
  Users, 
  Target, 
  Clock, 
  BookOpen,
  ArrowRight,
  Lightbulb,
  ArrowLeft,
  Plus,
  Quote,
  Star,
  Trash2,
  Edit3,
  Save
} from "lucide-react";

export const KnowledgeZone = () => {
  const { user, updateUser } = useAuth();
  const [currentView, setCurrentView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newQuote, setNewQuote] = useState({ text: "", author: "", category: "Motivation" });
  const [editingQuote, setEditingQuote] = useState<number | null>(null);

  const [userQuotes, setUserQuotes] = useState([
    { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation", addedBy: "user" },
    { id: 2, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Resilience", addedBy: "user" },
    { id: 3, text: "The mind is everything. What you think you become.", author: "Buddha", category: "Mental Strength", addedBy: "user" }
  ]);

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
      articles: user?.mentalArticlesRead || 0,
      progress: Math.min((user?.mentalArticlesRead || 0) * 8.33, 100)
    },
    {
      id: 2,
      title: "Social Skills",
      description: "Leadership and communication mastery",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
      articles: user?.socialArticlesRead || 0,
      progress: Math.min((user?.socialArticlesRead || 0) * 12.5, 100)
    },
    {
      id: 3,
      title: "Emotional Intelligence",
      description: "Understand and control your emotions",
      icon: Heart,
      color: "bg-red-100 text-red-700",
      articles: user?.emotionalArticlesRead || 0,
      progress: Math.min((user?.emotionalArticlesRead || 0) * 6.67, 100)
    },
    {
      id: 4,
      title: "Goal Setting",
      description: "Strategic planning and execution",
      icon: Target,
      color: "bg-green-100 text-green-700",
      articles: user?.goalArticlesRead || 0,
      progress: Math.min((user?.goalArticlesRead || 0) * 10, 100)
    }
  ];

  const allArticles = [
    {
      title: "How to Handle Criticism Like a Man",
      category: "Mental Strength",
      readTime: "3 min",
      excerpt: "Turn criticism into fuel for growth instead of letting it break you down.",
      read: false
    },
    {
      title: "The Power of Saying No",
      category: "Social Skills",
      readTime: "4 min",
      excerpt: "Boundaries are not walls—they're the foundation of respect.",
      read: false
    },
    {
      title: "Building Unshakeable Confidence",
      category: "Mental Strength",
      readTime: "5 min",
      excerpt: "Confidence isn't about being loud. It's about knowing who you are.",
      read: false
    },
    {
      title: "Leading by Example",
      category: "Social Skills",
      readTime: "6 min",
      excerpt: "True leadership is about inspiring others through your actions.",
      read: false
    },
    {
      title: "Managing Anger Effectively",
      category: "Emotional Intelligence",
      readTime: "4 min",
      excerpt: "Channel your anger into productive energy instead of destructive force.",
      read: false
    },
    {
      title: "Setting SMART Goals",
      category: "Goal Setting",
      readTime: "7 min",
      excerpt: "Learn the framework that turns dreams into achievable milestones.",
      read: false
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

  const addQuote = () => {
    if (newQuote.text && newQuote.author) {
      const quote = {
        id: Date.now(),
        text: newQuote.text,
        author: newQuote.author,
        category: newQuote.category,
        addedBy: "user"
      };
      setUserQuotes([...userQuotes, quote]);
      setNewQuote({ text: "", author: "", category: "Motivation" });
      if (user) {
        updateUser({ xp: user.xp + 10 });
      }
    }
  };

  const deleteQuote = (id: number) => {
    setUserQuotes(userQuotes.filter(q => q.id !== id));
  };

  const startEditQuote = (id: number) => {
    setEditingQuote(id);
  };

  const saveEditQuote = (id: number, updatedQuote: any) => {
    setUserQuotes(userQuotes.map(q => q.id === id ? { ...q, ...updatedQuote } : q));
    setEditingQuote(null);
  };

  const readArticle = (articleTitle: string, category: string) => {
    if (!user) return;
    
    // Simulate reading an article and update user progress
    const categoryKey = category.toLowerCase().replace(' ', '') + 'ArticlesRead' as keyof User;
    const currentCount = (user[categoryKey] as number) || 0;
    
    updateUser({
      [categoryKey]: currentCount + 1,
      xp: user.xp + 15,
      totalReadingTime: user.totalReadingTime + Math.floor(Math.random() * 10) + 3
    });
  };

  if (currentView === "quotes") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setCurrentView("main")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Quotations</h1>
            <p className="text-gray-600">Wisdom collection for daily inspiration</p>
          </div>
        </div>

        {/* Add New Quote */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Plus className="h-5 w-5" />
              Add New Quote
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your favorite quote..."
                value={newQuote.text}
                onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                className="min-h-[80px]"
              />
              <div className="flex gap-4">
                <Input
                  placeholder="Author"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                />
                <select
                  value={newQuote.category}
                  onChange={(e) => setNewQuote({ ...newQuote, category: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="Motivation">Motivation</option>
                  <option value="Resilience">Resilience</option>
                  <option value="Mental Strength">Mental Strength</option>
                  <option value="Success">Success</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>
              <Button onClick={addQuote} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Quote (+10 XP)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userQuotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {editingQuote === quote.id ? (
                  <div className="space-y-4">
                    <Textarea
                      defaultValue={quote.text}
                      onChange={(e) => quote.text = e.target.value}
                    />
                    <Input
                      defaultValue={quote.author}
                      onChange={(e) => quote.author = e.target.value}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => saveEditQuote(quote.id, quote)}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingQuote(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <Quote className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                      <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                        "{quote.text}"
                      </blockquote>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">— {quote.author}</p>
                        <Badge variant="outline" className="mt-1">{quote.category}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => startEditQuote(quote.id)}>
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteQuote(quote.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === "articles") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setCurrentView("main")}>
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

        <div className="space-y-4">
          {getFilteredArticles().map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <Badge variant="outline">{article.category}</Badge>
                      {article.read && <Badge className="bg-green-100 text-green-700">Read</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        +15 XP
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => readArticle(article.title, article.category)}
                    className="ml-4"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 rounded-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            KNOWLEDGE ZONE
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Develop wisdom, build character, become stronger
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold">EXPAND YOUR MIND</span>
            <Lightbulb className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-purple-200"
          onClick={() => setCurrentView("quotes")}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Quote className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">My Quotations</h3>
            <p className="text-sm text-gray-600 mb-4">Personal collection of inspiring quotes</p>
            <Badge variant="secondary">{userQuotes.length} quotes</Badge>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-blue-200"
          onClick={handleBrowseAllClick}
        >
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Browse Articles</h3>
            <p className="text-sm text-gray-600 mb-4">Explore all knowledge articles</p>
            <Badge variant="secondary">{allArticles.length} articles</Badge>
          </CardContent>
        </Card>
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
                Mark as Read (+10 XP)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Categories */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Knowledge Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {knowledgeCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${category.color.replace('text-', 'bg-').replace('-700', '-100')}`}>
                          <Icon className={`h-6 w-6 ${category.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{category.articles} articles available</span>
                        <span className="text-gray-500">{Math.floor(category.progress)}% explored</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${category.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Quote */}
      <Card className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <CardContent className="p-8 text-center">
          <Quote className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <blockquote className="text-2xl font-medium mb-6 italic">
            "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
          </blockquote>
          <p className="text-blue-300 text-lg">— Dr. Seuss</p>
          <Button 
            variant="secondary" 
            size="lg"
            className="mt-6"
            onClick={() => setCurrentView("quotes")}
          >
            View My Collection
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
