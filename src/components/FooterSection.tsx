const FooterSection = () => {
  return (
    <footer className="text-center pt-5 border-t border-gray-300 text-gray-600 text-sm">
      <p>
        Made with ❤️ by{' '}
        <a className="text-blue-500 transition-colors duration-300 hover:text-blue-700" href="https://www.facebook.com/tariqul.islam.fb/" target="_blank" rel="noopener noreferrer">
          Tariqul Islam
        </a>{' '}
        |{' '}
        <a className="text-blue-500 transition-colors duration-300 hover:text-blue-700" href="https://www.linkedin.com/in/tariqul-dev" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        |{' '}
        <a className="text-blue-500 transition-colors duration-300 hover:text-blue-700" href="https://github.com/tariqul420" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
      <p>© {new Date().getFullYear()} - সেনা ক্যাম্প লোকেশন জানার জন্য অফিসিয়াল তথ্য ব্যবহার করা হয়েছে</p>
    </footer>
  );
};

export default FooterSection;
