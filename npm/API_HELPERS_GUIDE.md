# API Helper Functions - Usage Guide

The `my-next-core` package now includes convenient helper functions for all common HTTP methods with and without authentication.

## 📚 Available Functions

### GET Requests
- `getWithAuth<T>(url, token, query?, headers?)` - GET with authentication
- `getWithoutAuth<T>(url, query?, headers?)` - GET without authentication

### POST Requests
- `postWithAuth<T>(url, token, data?, headers?)` - POST with authentication
- `postWithoutAuth<T>(url, data?, headers?)` - POST without authentication

### PUT Requests
- `putWithAuth<T>(url, token, data?, headers?)` - PUT with authentication
- `putWithoutAuth<T>(url, data?, headers?)` - PUT without authentication

### DELETE Requests
- `deleteWithAuth<T>(url, token, headers?)` - DELETE with authentication
- `deleteWithoutAuth<T>(url, headers?)` - DELETE without authentication

### PATCH Requests
- `patchWithAuth<T>(url, token, data?, headers?)` - PATCH with authentication
- `patchWithoutAuth<T>(url, data?, headers?)` - PATCH without authentication

---

## 🎯 Usage Examples

### GET with Authentication

```typescript
import { getWithAuth, getToken } from 'my-next-core';

// In a server component
async function fetchUserProfile() {
  const token = await getToken();
  const profile = await getWithAuth<UserProfile>(
    'https://api.example.com/user/profile',
    token
  );
  return profile;
}

// With query parameters
async function fetchProducts() {
  const token = await getToken();
  const products = await getWithAuth<Product[]>(
    'https://api.example.com/products',
    token,
    { page: 1, limit: 20, category: 'electronics' }
  );
  return products;
}

// With custom headers
async function fetchWithCustomHeaders() {
  const token = await getToken();
  const data = await getWithAuth<Data>(
    'https://api.example.com/data',
    token,
    { filter: 'active' },
    { 'X-Custom-Header': 'value' }
  );
  return data;
}
```

### GET without Authentication

```typescript
import { getWithoutAuth } from 'my-next-core';

// Public API endpoint
async function fetchPublicData() {
  const data = await getWithoutAuth<PublicData>(
    'https://api.example.com/public/info'
  );
  return data;
}

// With query parameters
async function searchPublic(searchTerm: string) {
  const results = await getWithoutAuth<SearchResults>(
    'https://api.example.com/search',
    { q: searchTerm, limit: 10 }
  );
  return results;
}
```

### POST with Authentication

```typescript
import { postWithAuth, getToken } from 'my-next-core';

// Create a new order
async function createOrder(orderData: OrderInput) {
  const token = await getToken();
  const order = await postWithAuth<Order>(
    'https://api.example.com/orders',
    token,
    {
      items: orderData.items,
      shippingAddress: orderData.address,
      paymentMethod: orderData.payment
    }
  );
  return order;
}

// Update user preferences
async function updatePreferences(preferences: UserPreferences) {
  const token = await getToken();
  const result = await postWithAuth<{ success: boolean }>(
    'https://api.example.com/user/preferences',
    token,
    preferences
  );
  return result;
}
```

### POST without Authentication

```typescript
import { postWithoutAuth } from 'my-next-core';

// Login endpoint (no auth needed)
async function login(username: string, password: string) {
  const response = await postWithoutAuth<LoginResponse>(
    'https://api.example.com/auth/login',
    { username, password }
  );
  return response;
}

// Newsletter subscription
async function subscribeToNewsletter(email: string) {
  const result = await postWithoutAuth<{ message: string }>(
    'https://api.example.com/newsletter/subscribe',
    { email }
  );
  return result;
}

// Contact form
async function submitContactForm(formData: ContactForm) {
  const response = await postWithoutAuth<{ success: boolean }>(
    'https://api.example.com/contact',
    formData
  );
  return response;
}
```

### PUT with Authentication

```typescript
import { putWithAuth, getToken } from 'my-next-core';

// Update entire product
async function updateProduct(id: string, productData: Product) {
  const token = await getToken();
  const updated = await putWithAuth<Product>(
    `https://api.example.com/products/${id}`,
    token,
    productData
  );
  return updated;
}

// Update user profile
async function updateUserProfile(profile: UserProfile) {
  const token = await getToken();
  const updated = await putWithAuth<UserProfile>(
    'https://api.example.com/user/profile',
    token,
    profile
  );
  return updated;
}
```

### PUT without Authentication

```typescript
import { putWithoutAuth } from 'my-next-core';

// Update public settings (if allowed)
async function updatePublicSettings(settings: PublicSettings) {
  const result = await putWithoutAuth<{ success: boolean }>(
    'https://api.example.com/public/settings',
    settings
  );
  return result;
}
```

### DELETE with Authentication

```typescript
import { deleteWithAuth, getToken } from 'my-next-core';

// Delete a product
async function deleteProduct(id: string) {
  const token = await getToken();
  await deleteWithAuth<void>(
    `https://api.example.com/products/${id}`,
    token
  );
}

// Delete user account
async function deleteAccount() {
  const token = await getToken();
  await deleteWithAuth<{ message: string }>(
    'https://api.example.com/user/account',
    token
  );
}

// With custom headers
async function deleteWithHeaders(id: string) {
  const token = await getToken();
  await deleteWithAuth<void>(
    `https://api.example.com/items/${id}`,
    token,
    { 'X-Delete-Reason': 'User requested' }
  );
}
```

### DELETE without Authentication

```typescript
import { deleteWithoutAuth } from 'my-next-core';

// Clear cache (public endpoint)
async function clearCache() {
  await deleteWithoutAuth<void>(
    'https://api.example.com/cache/clear'
  );
}
```

### PATCH with Authentication

```typescript
import { patchWithAuth, getToken } from 'my-next-core';

// Partial update of product (only price)
async function updateProductPrice(id: string, newPrice: number) {
  const token = await getToken();
  const updated = await patchWithAuth<Product>(
    `https://api.example.com/products/${id}`,
    token,
    { price: newPrice }
  );
  return updated;
}

// Update user status
async function updateUserStatus(status: 'active' | 'inactive') {
  const token = await getToken();
  const result = await patchWithAuth<User>(
    'https://api.example.com/user/status',
    token,
    { status }
  );
  return result;
}

// Partial profile update
async function updateProfileField(field: string, value: any) {
  const token = await getToken();
  const updated = await patchWithAuth<UserProfile>(
    'https://api.example.com/user/profile',
    token,
    { [field]: value }
  );
  return updated;
}
```

### PATCH without Authentication

```typescript
import { patchWithoutAuth } from 'my-next-core';

// Update public preferences
async function updatePublicPreference(key: string, value: any) {
  const result = await patchWithoutAuth<{ success: boolean }>(
    'https://api.example.com/public/preferences',
    { [key]: value }
  );
  return result;
}
```

---

## 🔄 Combining with Existing Functions

You can use these helpers alongside the existing high-level functions:

```typescript
import { 
  getStoreInfo,        // High-level function
  getProducts,         // High-level function
  getWithAuth,         // Low-level helper
  postWithAuth,        // Low-level helper
  getToken 
} from 'my-next-core';

async function complexOperation() {
  // Use high-level functions for common operations
  const storeInfo = await getStoreInfo();
  const products = await getProducts({ filterParams });
  
  // Use low-level helpers for custom API calls
  const token = await getToken();
  const customData = await getWithAuth<CustomData>(
    'https://custom-api.example.com/data',
    token
  );
  
  // Post processed data
  const result = await postWithAuth(
    'https://api.example.com/process',
    token,
    { storeInfo, products, customData }
  );
  
  return result;
}
```

---

## 🎨 TypeScript Benefits

All functions are fully typed with generics:

```typescript
import { getWithAuth, getToken } from 'my-next-core';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

async function getUserProfile() {
  const token = await getToken();
  
  // TypeScript knows the return type is UserProfile
  const profile = await getWithAuth<UserProfile>(
    'https://api.example.com/user',
    token
  );
  
  // Auto-completion and type checking work!
  console.log(profile.name); // ✅ OK
  console.log(profile.invalid); // ❌ TypeScript error
  
  return profile;
}
```

---

## 🔒 Error Handling

All functions include built-in error handling:

```typescript
import { getWithAuth, getToken } from 'my-next-core';

async function fetchWithErrorHandling() {
  try {
    const token = await getToken();
    const data = await getWithAuth<Data>(
      'https://api.example.com/data',
      token
    );
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error.message);
    return { success: false, error: error.message };
  }
}
```

---

## 📖 Function Signatures

### With Authentication
```typescript
getWithAuth<T>(url: string, token: string, query?: QueryParams, headers?: Record<string, string>): Promise<T>
postWithAuth<T>(url: string, token: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
putWithAuth<T>(url: string, token: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
deleteWithAuth<T>(url: string, token: string, headers?: Record<string, string>): Promise<T>
patchWithAuth<T>(url: string, token: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
```

### Without Authentication
```typescript
getWithoutAuth<T>(url: string, query?: QueryParams, headers?: Record<string, string>): Promise<T>
postWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
putWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
deleteWithoutAuth<T>(url: string, headers?: Record<string, string>): Promise<T>
patchWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>
```

---

## 🚀 Best Practices

1. **Use High-Level Functions First**: For common operations like `getStoreInfo()`, `getProducts()`, use the provided high-level functions.

2. **Use Helpers for Custom APIs**: When you need to call custom endpoints, use these helper functions.

3. **Type Everything**: Always provide TypeScript generics for type safety.

4. **Handle Errors**: Wrap API calls in try-catch blocks.

5. **Token Management**: The `getToken()` function is cached and optimized - call it when needed.

6. **Choose the Right Method**:
   - GET: Retrieve data
   - POST: Create new resources
   - PUT: Update entire resources
   - PATCH: Update partial resources
   - DELETE: Remove resources

---

## 🎉 Summary

With these 10 new helper functions, you have complete control over all HTTP methods with or without authentication, making the package extremely flexible and reusable for any API integration!
