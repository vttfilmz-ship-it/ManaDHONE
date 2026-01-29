

export enum Category {
  RESTAURANT = 'Restaurant',
  RETAIL = 'Retail',
  SERVICE = 'Service',
  HEALTH = 'Health',
  AUTOMOTIVE = 'Automotive',
  EDUCATION = 'Education',
  REAL_ESTATE = 'Real Estate',
  TRAVEL = 'Travel Agency',
  LEGAL = 'Legal Services',
  GOVERNMENT = 'Government',
  OTHER = 'Other'
}

export enum AdType {
  BANNER = 'Main Banner Slider',
  SIDEBAR = 'Sidebar Widget',
  FEATURED = 'Featured Listing',
  NEWS_NATIVE = 'News Feed Integration'
}

export interface Transaction {
    id: string;
    referenceId: string; // ID of the business, ad, or job being paid for
    type: 'listing' | 'advert' | 'job' | 'realestate';
    amount: number;
    currency: string;
    status: 'success' | 'pending' | 'failed';
    method: 'UPI' | 'Card' | 'Netbanking';
    customerEmail: string;
    customerName: string;
    createdAt: number;
    /* Added missing itemName property to match usage in Admin finance list */
    itemName?: string;
}

export interface Broadcast {
    id: string;
    message: string;
    recipientType: 'all' | 'category' | 'debtors';
    targetCategory?: Category;
    sentAt: number;
    recipientCount: number;
    status: 'completed' | 'failed';
}

export interface TownStats {
  id: string;
  residents: string;
  dailyVisitors: string;
  verifiedShops: string;
  activeListings: string;
  lastUpdated: number;
}

export interface Property {
    id: string;
    title: string;
    type: 'House' | 'Plot' | 'Commercial' | 'Apartment';
    purpose: 'Sale' | 'Rent';
    price: string;
    area: string;
    location: string;
    description: string;
    imageUrl: string;
    images?: string[];
    agentId?: string;
    status: 'available' | 'sold' | 'pending' | 'rejected';
    featured?: boolean;
    createdAt: number;
    // New Features
    bedrooms?: number;
    bathrooms?: number;
    parking?: boolean;
    amenities?: string[];
}

export interface RealEstateAgent {
    id: string;
    name: string;
    agency: string;
    phone: string;
    imageUrl: string;
    bio: string;
    experience: string;
    verified: boolean;
}

export interface AdRequest {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  adType: AdType;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
  paymentId?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: number;
}

export interface User {
    id: string;
    username: string;
    password: string; 
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface Business {
  id: string;
  ownerId?: string;
  status: 'pending' | 'approved' | 'rejected';
  name: string;
  category: Category;
  description: string;
  shortDescription: string;
  phone: string;
  email: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  images?: string[];
  rating: number;
  views?: number;
  verified: boolean;
  isFeatured?: boolean;
  createdAt: number;
  reviews?: Review[];
  openTime?: string;
  closeTime?: string;
  daysOpen?: string;
  paymentId?: string;
}

export interface Advert {
  id: string;
  ownerId?: string;
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  description: string;
  imageUrl: string;
  businessId?: string;
  page?: 'home' | 'realestate';
  paymentId?: string;
}

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    date: number;
    imageUrl: string;
    author: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: 'Instagram' | 'YouTube' | 'Facebook';
  followers: string;
  imageUrl: string;
  profileUrl: string;
}

export interface LocalEvent {
  id: string;
  title: string;
  type: 'Movie' | 'Event';
  location: string;
  date: string;
  imageUrl: string;
}

export interface EmergencyContact {
    id: string;
    title: string;
    number: string;
}

export interface BusinessStats {
  total: number;
  byCategory: Record<Category, number>;
  verifiedCount: number;
}

export interface AnalyticsData {
  totalViews: number;
  totalReviews: number;
  topBusinesses: Business[];
  categoryViews: Record<string, number>;
}

export interface JobCategory {
    id: string;
    name: string;
}

export interface Job {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  postedDate: number;
  applyByDate: number;
  description: string;
  contact: string;
  category: string;
  isFeatured?: boolean;
  paymentId?: string;
}

export interface JobAlert {
    id: string;
    email: string;
    keywords?: string;
    category: string;
    type: string;
    createdAt: number;
}

export interface Freelancer {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  name: string;
  skill: string;
  category: 'Tech' | 'Home Service' | 'Education' | 'Creative' | 'Other';
  experience: string;
  contact: string;
  description: string;
  hourlyRate?: string;
  imageUrl: string;
  location: string;
  joinedDate: number;
  isFeatured?: boolean;
}

export interface HistoryEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    iconType: 'fort' | 'war' | 'ruler' | 'train' | 'industry' | 'agri' | 'govt';
    imageUrl?: string;
}

export interface TourismSpot {
    id: string;
    name: string;
    type: 'Temple' | 'Fort' | 'Nature' | 'Landmark';
    description: string;
    location: string;
    imageUrl: string;
    highlights?: string;
    latitude?: number;
    longitude?: number;
}

export interface WeatherData {
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Clear';
    humidity: number;
    windSpeed: number;
}

export interface HeroSlide {
    id: string;
    imageUrl: string;
    caption?: string;
    active: boolean;
    page: 'home' | 'history' | 'tourism' | 'jobs' | 'freelancers' | 'realestate';
}

export interface FMProgram {
    id: string;
    time: string;
    title: string;
    host: string;
    active: boolean;
    audioUrl?: string;
    videoUrl?: string;
    status: 'pending' | 'approved' | 'rejected';
}