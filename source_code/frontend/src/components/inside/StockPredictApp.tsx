import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import CompanyInfo from './CompanyInfo';
import StockChart from './StockChart';
import MarketOverview from './MarketOverview';
import CompanyProfile from './CompanyAllDetails';
import Header from './Header';
// import useWishlistStore from '../store/wishlistStore';
import useWishlistStore from '@/store/wishlistStore';
// import useCompanyProfileStore from '../store/companyProfileStore'; // Import the Zustand store
import useCompanyProfileStore from '@/store/companyProfileStore'; // Import the Zustand store


function StockPredictApp() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { companySymbol } = useParams();
  const backend_url = import.meta.env.VITE_BACKEND_FLASK_URL;
  const FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY;

  const { wishlist, addToWishlist, removeFromWishlist, setWishlist } = useWishlistStore();
  const { companyProfile, isFetched, setCompanyProfile, clearCompanyProfile } = useCompanyProfileStore();
  // const { companyProfiles, setCompanyProfile, getCompanyProfile, isFetched } = useCompanyProfileStore();

  // Fetch wishlist data for the user
  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${backend_url}/wishlist/${user.id}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setWishlist(response.data);
          } else {
            setWishlist([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
        });
    }
  }, [user?.id, setWishlist]);

  // Save wishlist data for the user
  useEffect(() => {
    if (user?.id && wishlist.length > 0) {
      axios
        .post(`${backend_url}/wishlist/${user.id}`, { wishlist })
        .then((response) => {
          console.log('Wishlist saved:', response.data);
        })
        .catch((error) => {
          console.error('Error saving wishlist:', error);
        });
    }
  }, [wishlist, user?.id]);

  // // Fetch company profile data if not already fetched
  // useEffect(() => {
  //   if (companySymbol && !isFetched) {
  //     const fetchCompanyProfile = async () => {
  //       try {
  //         const profileResponse = await axios.get(`${backend_url}/get-stock-profile/${companySymbol}`);
          
  //         if (profileResponse.data && profileResponse.data.length > 0) {
  //           setCompanyProfile(profileResponse.data[0]); // Store the profile data in Zustand
  //           setSelectedCompany({
  //             name: profileResponse.data[0].companyName,
  //             symbol: companySymbol,
  //           });
  //         }
  //       } catch (error) {
  //         console.error('Error fetching company profile:', error);
  //       }
  //     };

  //     fetchCompanyProfile();
  //   }
  // }, [companySymbol, isFetched, setCompanyProfile]);

  // Fetch company profile data when companySymbol changes
  useEffect(() => {
    if (companySymbol) {
      // Clear previous profile data to prevent old data from being shown
      clearCompanyProfile();

      const fetchCompanyProfile = async () => {
        try {
          const profileResponse = await axios.get(`${backend_url}/get-stock-profile/${companySymbol}`);
          
          if (profileResponse.data && profileResponse.data.length > 0) {
            setCompanyProfile(profileResponse.data[0]); // Store the profile data in Zustand
            setSelectedCompany({
              name: profileResponse.data[0].companyName,
              symbol: companySymbol,
            });
          }
        } catch (error) {
          console.error('Error fetching company profile:', error);
        }
      };

      fetchCompanyProfile();
    }
  }, [companySymbol, setCompanyProfile, clearCompanyProfile]);

  // // Fetch company profile data when companySymbol changes
  // useEffect(() => {
  //   if (companySymbol) {
  //     // If company profile exists in the store, skip the API call
  //     if (!getCompanyProfile(companySymbol)) {
  //       const fetchCompanyProfile = async () => {
  //         try {
  //           const profileResponse = await axios.get(`${backend_url}/get-stock-profile/${companySymbol}`);
            
  //           if (profileResponse.data && profileResponse.data.length > 0) {
  //             setCompanyProfile(companySymbol, profileResponse.data[0]); // Store the profile data in Zustand
  //             setSelectedCompany({
  //               name: profileResponse.data[0].companyName,
  //               symbol: companySymbol,
  //             });
  //           }
  //         } catch (error) {
  //           console.error('Error fetching company profile:', error);
  //         }
  //       };

  //       fetchCompanyProfile();
  //     } else {
  //       // If company profile exists, just set selected company to use cached profile
  //       setSelectedCompany({
  //         name: getCompanyProfile(companySymbol)?.companyName,
  //         symbol: companySymbol,
  //       });
  //     }
  //   }
  // }, [companySymbol, setCompanyProfile, getCompanyProfile]);



  const handleSignOut = async () => {
    await signOut();
    navigate("/"); 
  };

  // Handle company selection from the search bar
  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    navigate(`/stocks/${company.symbol}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSignOut={handleSignOut}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        wishlist={wishlist}
      />

      <main className="max-w-9xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <SearchBar onCompanySelect={handleCompanySelect} />

          {selectedCompany ? (
            <div className="space-y-6">
              <CompanyInfo
                company={selectedCompany}
                onAddToWishlist={addToWishlist}
                onRemoveFromWishlist={removeFromWishlist}
                isInWishlist={wishlist.some((item) => item.symbol === selectedCompany.symbol)}
              />

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center text-gray-700">Stock Performance</h2>
                </div>
                <StockChart company={selectedCompany} />
              </div>

              {companyProfile && (
                <CompanyProfile profile={companyProfile} />
              )}
            </div>
              
          ) : (
            <MarketOverview
              wishlist={wishlist}
              onSelectCompany={handleCompanySelect}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default StockPredictApp;