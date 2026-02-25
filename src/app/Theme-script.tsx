export const ThemeScript = () => {
  const themeScript = `
	(function() {
	  try {
		const stored = localStorage.getItem('needmo-theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		let theme = stored || (prefersDark ? 'dark' : 'light');
		
		if (theme === 'dark') {
		  document.documentElement.classList.add('dark');
		  document.documentElement.style.colorScheme = 'dark';
		} else {
		  document.documentElement.classList.remove('dark');
		  document.documentElement.style.colorScheme = 'light';
		}
		
		document.documentElement.setAttribute('data-theme', theme);
	  } catch (e) {
		console.error('Theme initialization failed:', e);
		// Fallback to light theme
		document.documentElement.classList.remove('dark');
		document.documentElement.style.colorScheme = 'light';
	  }
	})();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};
