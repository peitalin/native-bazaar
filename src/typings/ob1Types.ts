


export interface iListing {
  averageRating?: string
  categories?: string[]
  contractType?: string
  description?: string
  freeShipping?: string[]
  hash?: string
  language?: string
  nsfw?: boolean
  price?: {
    amount?: number
    currencyCode?: string
  }
  ratingCount?: number
  shipsTo?: string[]
  slug?: string
  thumbnail?: {
    medium?: string
    small?: string
    tiny?: string
  }
  title?: string
}

export interface iListingImage {
  filename: string
  original?: string
  large?: string
  medium?: string
  small?: string
  tiny?: string
}
interface iListingOption {
  name?: string
  description?: string
  variants?: Array<{
    name?: string
    image?: iListingImage
  }>
}
interface iSkus {
  variantCombo: number[]
  productID: string
}
interface iShippingOption {
  name: string
  type: string
  regions: string[]
  services: Array<{
    name: string
    estimatedDelivery: string
    price: number | string
  }>
}

export interface iListingDetails {
  listing?: {
    slug?: string
    vendorID?: {
      peerID?: string
      blockchainID?: string
      pubkeys?: {
        identity?: string
        bitcoin?: string
      },
      bitcoinSig?: string
    },
    metadata?: {
      version?: number
      contractType?: string
      format?: string
      expiry?: string
      acceptedCurrencies?: [
        string
      ],
      pricingCurrency?: string
      escrowTimeoutHours?: number
    },
    item?: {
      title?: string
      description?: string
      processingTime?: string
      price?: number
      tags?: string[]
      images?: Array<{
        filename?: string
        original?: string
        large?: string
        medium?: string
        small?: string
        tiny?: string
      }>,
      categories?: string[]
      condition?: string
      options?: iListingItemOptions[]
      skus?: iListingSkus[]
    },
    shippingOptions?: Array<{
      name?: string
      type?: string
      regions?: string[]
      services?: iListingShippingOptionsServices[]
    }>,
    taxes?: any[]
    coupons?: any[]
    moderators?: string[]
    termsAndConditions?: string
    refundPolicy?: string
  }
  signature?: string
}

export interface iListingItemOptions {
  name?: string
  description?: string
  variants?: Array<{ name?: string }>
}
interface iListingSkus {
  variantCombo?: number[]
  productID?: string
}
interface iListingShippingOptionsServices {
  name?: string
  price?: number
  estimatedDelivery?: number
}

export interface iOB1Profile {
  peerID?: string
  handle?: string
  name?: string
  location?: string
  about?: string
  shortDescription?: string
  nsfw?: boolean
  vendor?: boolean
  moderator?: boolean
  contactInfo?: {
    website?: string
    email?: string
    phoneNumber?: string
    social?: Array<{ type: string, username: string, proof: string }>
  }
  colors?: {
    primary?: string
    secondary?: string
    text?: string
    highlight?: string
    highlightText?: string
  }
  stats?: {
    followerCount?: number
    followingCount?: number
    listingCount?: number
    ratingCount?: number
    averageRating?: number
  },
  avatarHashes?: iImageSizes
  headerHashes?: iImageSizes
  bitcoinPubkey?: string
  lastModified?: string
  errors?: any
  success?: boolean
  reason?: string
}

interface iImageSizes {
  tiny?: string
  small?: string
  medium?: string
  large?: string
  original?: string
}

export interface iOB1Settings {
  blockedNodes?: string[]
  country?: string
  language?: string
  localCurrency?: string
  mispaymentBuffer?: number
  paymentDataInQR?: boolean
  moderators?: string[]
  refundPolicy?: string
  shippingAddresses?: iOB1ShippingAddress[]
  showNotifications?: boolean
  showNsfw?: boolean
  smtpSettings?: iOB1SmtpSettings
  storeModerators?: string[]
  termsAndConditions?: string
  version?: string
  [key: string]: any
}

export interface iOB1ShippingAddress {
  name?: string
  company?: string
  addressLineOne?: string
  addressLineTwo?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  addressNotes?: string
}


export interface iOB1SmtpSettings {
  notifications: boolean
  serverAddress: string
  username: string
  password: string
  senderEmail: string
  recipientEmail: string
}


export interface iOB1RegistrationResponse {
  username: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

export interface iOB1SetProfileBody {
  peerID?: string
  handle: string
  name: string
  location?: string
  about?: string
  shortDescription?: string
  nsfw?: boolean
  vendor?: boolean
  moderator?: boolean
  contactInfo: {
    website?: string
    email: string
    phoneNumber?: string
    social?: Array<{ type: string, username: string, proof: string }>
  }
  colors?: {
    primary: string
    secondary: string
    text: string
    highlight: string
    highlightText: string
  }
  stats?: {
    followerCount?: number
    followingCount?: number
    listingCount?: number
    ratingCount?: number
    averageRating?: number
  },
  avatarHashes?: iImageSizes
  headerHashes?: iImageSizes
  bitcoinPubkey?: string
  lastModified?: string
  errors?: any
  success?: boolean
  reason?: string
}



