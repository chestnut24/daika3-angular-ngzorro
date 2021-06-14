export class Menu {
  icon: string;
  text: string;
  url: string;
  children: MenuItem[];
  constructor(text: string, icon: string , url: string, children?: MenuItem[]) {
    this.icon = icon;
    this.text = text;
    this.url = url;
    this.children = children;
  }
}

export interface MenuItem {
  icon: string;
  text: string;
  url: string;
  children?: MenuItem[];
}

