import './index.css';

const ErrorNotFound = () => {
  return (
    <div className="error-not-found">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/drugInfo" className="home-link">Go back to Drug Info Page</a>
    </div>
  );
};

export default ErrorNotFound;
