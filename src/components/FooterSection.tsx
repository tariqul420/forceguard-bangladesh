const FooterSection = () => {
  return (
    <footer className="text-center text-medium pt-5 text-sm">
      <p>
        Made with ❤️ by{' '}
        <a className="" href="https://www.facebook.com/tariqul.islam.fb/" target="_blank" rel="noopener noreferrer">
          Tariqul Islam
        </a>{' '}
        |{' '}
        <a className="" href="https://www.linkedin.com/in/tariqul-dev" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        |{' '}
        <a className="" href="https://github.com/tariqul420" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
      <p className="text-medium">© {new Date().getFullYear()} - সেনা ক্যাম্প লোকেশন জানার জন্য অফিসিয়াল তথ্য ব্যবহার করা হয়েছে</p>
    </footer>
  );
};

export default FooterSection;
