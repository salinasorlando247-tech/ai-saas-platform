import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Dashboard Crash:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: "white",
          padding: "40px",
          textAlign: "center"
        }}>
          ⚠ Dashboard crashed — reload page
        </div>
      );
    }

    return this.props.children;
  }
}
