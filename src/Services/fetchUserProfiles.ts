// lib/fetchUserProfiles.ts

interface Country {
    id: number;
    name: string;
  }
  
  interface UserProfile {
    id: number;
    name: string;
    user_name: string;
    created_at: string;
    age: number;
    country: Country;
    gender: string;
    job_title: string;
  }
  
  interface UsersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserProfile[];
  }
  
  export async function fetchUserProfiles(): Promise<UsersResponse> {
    const response = await fetch('https://dv2.brontosolutions.com:8000/assignment/userprofiles/');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profiles');
    }
    
    const data: UsersResponse = await response.json();
    return data;
  }
  