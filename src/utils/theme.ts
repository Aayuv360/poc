export type CustomerTheme = {
  name: string;
  logoPrimaryColor: string;
  primaryColor: string;
  logoUrl: string;
  accentColor: string;
  softColor?: string;
  dangerColor?: string;
  cardColor:string
};

export const customerThemes: Record<string, CustomerTheme> = {
  acme: {
    name: "Hewlett Packard Enterprise",
    logoPrimaryColor: "#00A0DC",
    primaryColor: "#0096D6",
    accentColor: "#0096D6",
    cardColor:'#33b5e4',
    logoUrl: "/logos/hp.png",    
  },
  globex: {
    name: "Lenovo",
    logoPrimaryColor: "#e42022",
    primaryColor: "#D32F2F",
    logoUrl: "/logos/lenovo.png",
    accentColor: "#E53935",
    softColor: "#FFCDD2",
    dangerColor: "#B71C1C",
    cardColor:'#f25a5c',

  },
};

// Simple credentials mapping for demo: username -> customer key
export const userCustomerMap: Record<string, string> = {
  hpuser: "acme",
  lenovouser: "globex",
};

// Very simple "authentication" check
export function authenticate(
  username: string): string | null {
  // In real app validate password; here we accept any password if user exists
  if (userCustomerMap[username]) return userCustomerMap[username];
  return null;
}
