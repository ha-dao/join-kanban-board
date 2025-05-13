/**
 * Interface representing a contact in the system.
 * Defines the structure and required properties for contact objects.
 */
export interface Contact {
    /** Unique identifier for the contact, optional for new contacts */
    id?: string;
    
    /** Full name of the contact */
    name: string;
    
    /** Email address of the contact */
    email: string;
    
    /** Phone number of the contact */
    phone: string;
    
    /** Color associated with the contact for UI purposes, optional */
    color?: string;
    
    /** Initials or representative letters for the contact, often used in avatars */
    letters: string;
    
    /** Indicates whether the contact is currently selected in a list or view */
    selected: boolean;
}