My GitHub Repo- https://github.com/sejalsingh7/shoppyglobe-e-commerce-app



Description:-

ShoppyGlobe (an e-commerce application) for online shopping using ReactJS, Router-DOM and Redux Toolkit with Firebase API. It is a piece of software that allows customers to browse and purchase items from an online store.

The project was created using React and MUI.

Component Structure:-

○ App: The main component.
○ Header: Display the navigation menu and shopping cart icon
○ ProductList: Displays a list of products.
○ ProductItem: Represents a single product including an “Add to Cart” button.
○ Product Detail: Show detailed information about a selected product.
○ Cart: Displays the items added to the cart with options to modify quantities or
remove items.
○ CartItem: Represents a single item in the cart.
○ NotFound: Display a 404 page for unknown routes.

Data Fetching with useEffect:-

○ Created custom hook for fetching product list. 
○ ProductDetail Component: Used useEffect to fetch details of a selected product
based on route parameters when the component mounts. Store the fetched data
in the component’s state. 
○ Error Handling: Implement error handling to manage failed data fetch requests
gracefully.

State Management:-

○ Redux: Implemented Redux for more complex state management.
○ Implement a search feature to filter products in the ProductList. 

React Routing:-

○ Implemented routing using React Router.
○ Created routes for Home, Product Detail, Cart, and Checkout pages.
○ Used route parameters for product details.

React Routing:-

○ Implemented routing using React Router.
○ Created routes for Home, Product Detail, Cart, and Checkout pages.
○ Used route parameters for product details.

Performance Optimization:-

○ Implemented code splitting and lazy loading for components using React.lazy and
Suspense

Styling:-

○ Applied css for styling.
○ The application is responsive and works well on different screen sizes.