const RouteAnnouncer = ({ pageName }) => {
  return (
    <h3 className="visually_hidden" aria-live="assertive" role="alert">
      {pageName}
    </h3>
  );
};

export default RouteAnnouncer;
