// News API Service for fetching real legal news
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'f9b0c4e8a4d24f5a9e8c1d7b3f2a6e9c';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const fetchLegalNews = async (pageSize = 20) => {
  try {
    const queries = [
      'legal OR law OR court OR justice',
      'supreme court OR legal rights',
      'law enforcement OR legislation'
    ];
    
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    
    const params = new URLSearchParams({
      q: randomQuery,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY
    });

    const response = await fetch(`${NEWS_API_URL}?${params}`);
    
    if (!response.ok) {
      console.warn('News API unavailable, using fallback data');
      return getFallbackNews();
    }

    const data = await response.json();
    
    if (data.status !== 'ok' || !data.articles) {
      return getFallbackNews();
    }

    const articles = data.articles
      .filter(article => 
        article.title && 
        article.description && 
        article.title !== '[Removed]'
      )
      .map(article => ({
        id: article.url || Math.random().toString(),
        title: article.title,
        excerpt: article.description,
        content: article.content || article.description,
        url: article.url,
        image: article.urlToImage || getDefaultImage(),
        source: article.source.name,
        author: article.author || article.source.name,
        publishedAt: new Date(article.publishedAt),
        category: categorizeArticle(article.title + ' ' + article.description)
      }));

    return articles.length > 0 ? articles : getFallbackNews();
  } catch (error) {
    console.error('Error fetching news:', error);
    return getFallbackNews();
  }
};

const categorizeArticle = (text) => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('consumer') || lowerText.includes('protection')) {
    return { name: 'Consumer Law', color: 'blue', icon: '⚖️' };
  }
  if (lowerText.includes('cyber') || lowerText.includes('data') || lowerText.includes('privacy')) {
    return { name: 'Cyber Law', color: 'purple', icon: '🔒' };
  }
  if (lowerText.includes('labor') || lowerText.includes('employment')) {
    return { name: 'Labor Law', color: 'green', icon: '👔' };
  }
  if (lowerText.includes('property') || lowerText.includes('real estate')) {
    return { name: 'Property Law', color: 'orange', icon: '🏠' };
  }
  if (lowerText.includes('family') || lowerText.includes('divorce')) {
    return { name: 'Family Law', color: 'pink', icon: '👨‍👩‍👧' };
  }
  if (lowerText.includes('environment') || lowerText.includes('climate')) {
    return { name: 'Environmental Law', color: 'teal', icon: '🌱' };
  }
  if (lowerText.includes('criminal') || lowerText.includes('crime')) {
    return { name: 'Criminal Law', color: 'red', icon: '🚨' };
  }
  
  return { name: 'General Law', color: 'blue', icon: '⚖️' };
};

const getDefaultImage = () => {
  return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80';
};

export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
};

export const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const getFallbackNews = () => {
  const now = new Date();
  return [
    {
      id: '1',
      title: 'Supreme Court Issues Landmark Ruling on Digital Privacy Rights',
      excerpt: 'In a historic decision, the Supreme Court has established new precedents for protecting citizen data in the digital age.',
      content: 'The Supreme Court today delivered a landmark judgment strengthening digital privacy rights for Indian citizens. The ruling mandates stricter data protection measures for technology companies and gives users more control over their personal information. This decision comes after years of debate on balancing technological innovation with individual privacy rights.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      source: 'Legal Times India',
      author: 'Legal Desk',
      publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      category: { name: 'Cyber Law', color: 'purple', icon: '🔒' }
    },
    {
      id: '2',
      title: 'New Consumer Protection Guidelines: What You Need to Know',
      excerpt: 'Updated consumer protection regulations come into effect, offering stronger safeguards for online shoppers.',
      content: 'The government has introduced comprehensive consumer protection guidelines targeting e-commerce platforms. These new rules require companies to provide clearer product information, easier return processes, and better customer support. Consumers now have enhanced rights when dealing with defective products or misleading advertisements.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80',
      source: 'Consumer Rights Weekly',
      author: 'Regulatory Team',
      publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      category: { name: 'Consumer Law', color: 'blue', icon: '⚖️' }
    },
    {
      id: '3',
      title: 'Labor Law Reforms: Enhanced Employee Benefits Announced',
      excerpt: 'Government announces major reforms to labor laws, including increased minimum wage and better working conditions.',
      content: 'Significant changes to labor laws will benefit workers across sectors. The reforms include provisions for minimum wage increases, mandatory safety standards, improved social security benefits, and better work-life balance measures. Employers must comply with the new regulations within the next six months.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      source: 'Employment Law Journal',
      author: 'Labor Desk',
      publishedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      category: { name: 'Labor Law', color: 'green', icon: '👔' }
    },
    {
      id: '4',
      title: 'Property Rights: New Guidelines for Joint Ownership',
      excerpt: 'Clarifications issued on joint property ownership rights, inheritance laws, and taxation implications.',
      content: 'The Ministry of Housing has issued comprehensive guidelines on joint property ownership. These clarifications cover rights of co-owners, succession planning, tax implications of joint ownership, and dispute resolution mechanisms. The new framework aims to reduce property-related litigation.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      source: 'Property Law Update',
      author: 'Real Estate Desk',
      publishedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      category: { name: 'Property Law', color: 'orange', icon: '🏠' }
    },
    {
      id: '5',
      title: 'Family Law Updates: Custody and Maintenance Provisions',
      excerpt: 'Recent amendments to family law address child custody rights and maintenance with focus on child welfare.',
      content: 'New provisions in family law prioritize child welfare in custody battles. Courts now have enhanced powers to ensure fair maintenance and consider the best interests of children in divorce cases. The amendments also include provisions for grandparents visitation rights and protection against domestic violence.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&q=80',
      source: 'Family Law Review',
      author: 'Family Court Correspondent',
      publishedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      category: { name: 'Family Law', color: 'pink', icon: '👨‍👩‍👧' }
    },
    {
      id: '6',
      title: 'Environmental Law: Stricter Compliance for Industries',
      excerpt: 'New environmental regulations mandate stricter pollution controls and sustainable practices for industries.',
      content: 'Industries must now comply with enhanced environmental standards. The new regulations include mandatory emissions monitoring, waste management protocols, penalties for non-compliance, and incentives for adopting green technologies. The government aims to reduce industrial pollution by 40% over the next five years.',
      url: '#',
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
      source: 'Environmental Law Today',
      author: 'Green Law Desk',
      publishedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      category: { name: 'Environmental Law', color: 'teal', icon: '🌱' }
    }
  ];
};
