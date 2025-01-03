import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
    private renderer: Renderer2;
    private currentThemeLink: HTMLLinkElement | null = null;
  
    constructor(rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
    }
  
    private setTheme(themePath: string): void {
      // Elimina el link actual si existe
      if (this.currentThemeLink) {
        this.renderer.removeChild(document.head, this.currentThemeLink);
      }
  
      // Crea un nuevo elemento <link> y lo agrega al head
      const link = this.renderer.createElement('link') as HTMLLinkElement;
      link.rel = 'stylesheet';
      link.href = themePath;
  
      this.renderer.appendChild(document.head, link);
      this.currentThemeLink = link;
    }
  
    enableDarkTheme(): void {
      this.setTheme('assets/themes/stylesDark.css');
    }
  
    enableLightTheme(): void {
      this.setTheme('assets/themes/stylesLight.css');
    }
}
