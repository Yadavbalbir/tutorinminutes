import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      userLocation: null,
      
      // Tutors state
      tutors: [],
      filteredTutors: [],
      selectedTutor: null,
      searchQuery: '',
      filters: {
        subject: '',
        level: '',
        mode: 'all', // 'online', 'offline', 'all'
        priceRange: [0, 1000],
        rating: 0,
      },
      sortBy: 'recommended', // 'recommended', 'nearest', 'highest-rated', 'price-low', 'price-high'
      
      // Booking state
      currentBooking: {
        tutorId: null,
        mode: null, // 'online' or 'offline'
        subject: '',
        date: null,
        time: null,
        duration: 60,
        location: null,
        notes: '',
      },
      bookingStep: 1,
      
      // UI state
      isLoading: false,
      showLocationModal: false,
      showBookingModal: false,
      notifications: [],
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setUserLocation: (location) => set({ userLocation: location }),
      
      setTutors: (tutors) => set({ tutors, filteredTutors: tutors }),
      
      setSelectedTutor: (tutor) => set({ selectedTutor: tutor }),
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterTutors();
      },
      
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }));
        get().filterTutors();
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().sortTutors();
      },
      
      filterTutors: () => {
        const { tutors, searchQuery, filters } = get();
        
        let filtered = tutors.filter((tutor) => {
          // Search query filter
          if (searchQuery && !tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              !tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))) {
            return false;
          }
          
          // Subject filter
          if (filters.subject && !tutor.subjects.includes(filters.subject)) {
            return false;
          }
          
          // Level filter
          if (filters.level && !tutor.levels.includes(filters.level)) {
            return false;
          }
          
          // Mode filter
          if (filters.mode !== 'all' && !tutor.modes.includes(filters.mode)) {
            return false;
          }
          
          // Price filter
          if (tutor.pricePerHour < filters.priceRange[0] || tutor.pricePerHour > filters.priceRange[1]) {
            return false;
          }
          
          // Rating filter
          if (tutor.rating < filters.rating) {
            return false;
          }
          
          return true;
        });
        
        set({ filteredTutors: filtered });
        get().sortTutors();
      },
      
      sortTutors: () => {
        const { filteredTutors, sortBy, userLocation } = get();
        
        const sorted = [...filteredTutors].sort((a, b) => {
          switch (sortBy) {
            case 'highest-rated':
              return b.rating - a.rating;
            case 'price-low':
              return a.pricePerHour - b.pricePerHour;
            case 'price-high':
              return b.pricePerHour - a.pricePerHour;
            case 'nearest':
              if (!userLocation) return 0;
              return a.distance - b.distance;
            case 'recommended':
            default:
              // Combine rating and reviews for recommendation score
              return (b.rating * b.totalReviews) - (a.rating * a.totalReviews);
          }
        });
        
        set({ filteredTutors: sorted });
      },
      
      updateBooking: (bookingData) => {
        set((state) => ({
          currentBooking: { ...state.currentBooking, ...bookingData }
        }));
      },
      
      setBookingStep: (step) => set({ bookingStep: step }),
      
      resetBooking: () => set({
        currentBooking: {
          tutorId: null,
          mode: null,
          subject: '',
          date: null,
          time: null,
          duration: 60,
          location: null,
          notes: '',
        },
        bookingStep: 1,
      }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      toggleLocationModal: () => set((state) => ({ showLocationModal: !state.showLocationModal })),
      
      toggleBookingModal: () => set((state) => ({ showBookingModal: !state.showBookingModal })),
      
      addNotification: (notification) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id }]
        }));
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        }, 5000);
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },
    }),
    {
      name: 'tutor-store',
    }
  )
);

export default useStore;