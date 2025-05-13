/**
 * Interface representing user registration or profile data.
 * Contains the necessary fields for user account creation and management.
 */
export interface Userdata {
    /** User's full name or display name */
    name: string;
    
    /** User's email address, used for login and communications */
    email: string;
    
    /** User's password for authentication */
    password: string;
    
    /** Confirmation of user's password, used during registration for validation */
    confirmPassword: string;
}