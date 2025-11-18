import { useState, useEffect } from 'react';

const UserProfile = ({ userId = 1 }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/user/${userId}`);
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setUserData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title text-danger">Error</h5>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!userData || !userData.user) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <p>No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0">User Profile</h5>
      </div>
      <div className="card-body">
        <h6 className="card-title">{userData.user.name || 'Unknown User'}</h6>
        <p className="card-text mb-2">
          <strong>Email:</strong> {userData.user.email || 'N/A'}
        </p>
        <p className="card-text mb-2">
          <strong>User ID:</strong> {userData.user.id}
        </p>
        
        {userData.accounts && userData.accounts.length > 0 && (
          <div className="mt-3">
            <h6>Accounts</h6>
            <ul className="list-group">
              {userData.accounts.map((account, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{account.name || `Account ${index + 1}`}</span>
                  <span className="badge bg-primary rounded-pill">
                    {account.balance ? `$${account.balance.toFixed(2)}` : 'N/A'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(!userData.accounts || userData.accounts.length === 0) && (
          <div className="mt-3">
            <p className="text-muted">No accounts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
