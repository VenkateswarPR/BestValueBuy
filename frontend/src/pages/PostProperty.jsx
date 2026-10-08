import React, { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams
} from 'react-router-dom';

import {
  CheckCircle2,
  Upload,
  MapPin,
  IndianRupee,
  Home,
  Ruler,
  Building2,
  ImagePlus
} from 'lucide-react';


const STORAGE_KEY =
  'bestValueBuyUserProperties';


export default function PostProperty() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const editId =
    searchParams.get('edit');

  const isEditMode =
    Boolean(editId);


  /* =========================================================
     STATE
  ========================================================= */

  const [propertyType, setPropertyType] =
    useState('');

  const [photos, setPhotos] =
    useState([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  const [formData, setFormData] =
    useState({

      listingType: '',

      propertyType: '',

      expectedPrice: '',

      apartmentName: '',

      propertyName: '',

      builtUpArea: '',

      plotArea: '',

      udsValue: '',

      city: '',

      locality: '',

      pincode: '',

      bedrooms: '',

      propertyAge: '',

      bathrooms: '',

      listedBy: '',

      facing: '',

      description: '',

      roomType: '',

      sharingType: '',

      furnishedType: '',

      foodAvailable: '',

      attachedBathroom: '',

      genderPreference: '',

      availableFrom: '',

      currentOccupancy: '',

      totalCapacity: ''

    });


  /* =========================================================
     FLAGS
  ========================================================= */

  const isRent =
    formData.listingType === 'Rent';

  const isSell =
    formData.listingType === 'Sell';


  const isApartment =
    propertyType === 'Apartment';


  const isLand =
    propertyType === 'Land';


  const isPG =
    isRent &&
    propertyType === 'PG / Hostel';


  const isSingleRoom =
    isRent &&
    propertyType === 'Single Room';


  const isSharedRoom =
    isRent &&
    propertyType === 'Shared Room';


  const isStudio =
    isRent &&
    propertyType === 'Studio Apartment';


  const isServiceApartment =
    isRent &&
    propertyType === 'Service Apartment';


  const isRoomBasedRental =
    isPG ||
    isSingleRoom ||
    isSharedRoom;


  const isResidentialRental =
    isRent &&
    (
      isApartment ||
      propertyType === 'Individual House' ||
      propertyType === 'Villa' ||
      isStudio ||
      isServiceApartment
    );


  /* =========================================================
     LOAD EDIT PROPERTY
  ========================================================= */

  useEffect(() => {

    if (!editId) {
      return;
    }


    try {

      const savedProperties =
        JSON.parse(
          localStorage.getItem(
            STORAGE_KEY
          ) || '[]'
        );


      const existingProperty =
        savedProperties.find(
          (property) =>
            String(property.id) ===
            String(editId)
        );


      if (!existingProperty) {

        alert(
          'Property could not be found.'
        );

        navigate('/dashboard');

        return;

      }


      const existingType =
        existingProperty.type ||
        existingProperty.propertyType ||
        '';


      setPropertyType(
        existingType
      );


      setFormData({

        listingType:
          existingProperty.purpose === 'Rent'
            ? 'Rent'
            : 'Sell',

        propertyType:
          existingType,

        expectedPrice:
          existingProperty.price != null
            ? String(existingProperty.price)
            : '',

        apartmentName:
          existingProperty.apartmentName || '',

        propertyName:
          existingProperty.propertyName || '',

        builtUpArea:
          existingProperty.builtUpArea
            ? String(existingProperty.builtUpArea)
            : '',

        plotArea:
          existingProperty.plotArea
            ? String(existingProperty.plotArea)
            : '',

        udsValue:
          existingProperty.udsValue
            ? String(existingProperty.udsValue)
            : '',

        city:
          existingProperty.city || '',

        locality:
          existingProperty.locality || '',

        pincode:
          existingProperty.pincode || '',

        bedrooms:
          existingProperty.beds
            ? String(existingProperty.beds)
            : '',

        propertyAge:
          existingProperty.propertyAge || '',

        bathrooms:
          existingProperty.baths
            ? String(existingProperty.baths)
            : '',

        listedBy:
          existingProperty.listedBy || '',

        facing:
          existingProperty.facing || '',

        description:
          existingProperty.description || '',

        roomType:
          existingProperty.roomType || '',

        sharingType:
          existingProperty.sharingType || '',

        furnishedType:
          existingProperty.furnishedType || '',

        foodAvailable:
          existingProperty.foodAvailable || '',

        attachedBathroom:
          existingProperty.attachedBathroom || '',

        genderPreference:
          existingProperty.genderPreference || '',

        availableFrom:
          existingProperty.availableFrom || '',

        currentOccupancy:
          existingProperty.currentOccupancy != null
            ? String(
                existingProperty.currentOccupancy
              )
            : '',

        totalCapacity:
          existingProperty.totalCapacity != null
            ? String(
                existingProperty.totalCapacity
              )
            : ''

      });


      const existingImages =
        Array.isArray(
          existingProperty.images
        )
          ? existingProperty.images
          : existingProperty.image
            ? [existingProperty.image]
            : [];


      const existingPhotoNames =
        Array.isArray(
          existingProperty.photoNames
        )
          ? existingProperty.photoNames
          : [];


      setPhotos(
        existingImages.map(
          (image, index) => ({

            name:
              existingPhotoNames[index] ||
              `Property Photo ${index + 1}`,

            dataUrl:
              image

          })
        )
      );

    } catch (error) {

      console.error(
        'Unable to load property:',
        error
      );

      alert(
        'Unable to load this property.'
      );

      navigate('/dashboard');

    }

  }, [editId, navigate]);


  /* =========================================================
     FIELD CHANGE
  ========================================================= */

  const handleChange =
    (field, value) => {

      setFormData(
        (previous) => ({
          ...previous,
          [field]: value
        })
      );

    };


  /* =========================================================
     LISTING TYPE CHANGE
  ========================================================= */

  const handleListingTypeChange =
    (value) => {

      setFormData(
        (previous) => ({

          ...previous,

          listingType:
            value,

          /*
           * Changing Sell/Rent resets
           * the property-specific type.
           */

          propertyType: '',

          apartmentName: '',

          propertyName: '',

          builtUpArea: '',

          plotArea: '',

          udsValue: '',

          bedrooms: '',

          roomType: '',

          sharingType: '',

          furnishedType: '',

          foodAvailable: '',

          attachedBathroom: '',

          genderPreference: '',

          currentOccupancy: '',

          totalCapacity: ''

        })
      );


      setPropertyType('');

    };


  /* =========================================================
     PROPERTY TYPE CHANGE
  ========================================================= */

  const handlePropertyTypeChange =
    (value) => {

      setPropertyType(value);


      setFormData(
        (previous) => ({

          ...previous,

          propertyType:
            value,

          apartmentName:
            value === 'Apartment'
              ? previous.apartmentName
              : '',

          udsValue:
            value === 'Apartment'
              ? previous.udsValue
              : '',

          plotArea:
            (
              value === 'Land' ||
              value === 'Individual House' ||
              value === 'Villa'
            )
              ? previous.plotArea
              : '',

          builtUpArea:
            value === 'Land'
              ? ''
              : previous.builtUpArea,

          bedrooms:
            (
              value === 'Land' ||
              value === 'PG / Hostel' ||
              value === 'Shared Room'
            )
              ? ''
              : previous.bedrooms

        })
      );

    };


  /* =========================================================
     PHOTO UPLOAD
  ========================================================= */

  const handlePhotoUpload =
    async (event) => {

      const selectedFiles =
        Array.from(
          event.target.files || []
        );


      const imageFiles =
        selectedFiles.filter(
          (file) =>
            [
              'image/jpeg',
              'image/png'
            ].includes(file.type)
        );


      const availableSlots =
        10 - photos.length;


      if (availableSlots <= 0) {

        alert(
          'You can upload a maximum of 10 photos.'
        );

        event.target.value = '';

        return;

      }


      const filesToAdd =
        imageFiles.slice(
          0,
          availableSlots
        );


      if (
        filesToAdd.length === 0 &&
        selectedFiles.length > 0
      ) {

        alert(
          'Please upload JPG or PNG images only.'
        );

        event.target.value = '';

        return;

      }


      try {

        const newPhotos =
          await Promise.all(

            filesToAdd.map(
              async (file) => ({

                name:
                  file.name,

                dataUrl:
                  await compressImage(file)

              })
            )

          );


        setPhotos(
          (previous) => [
            ...previous,
            ...newPhotos
          ]
        );

      } catch (error) {

        console.error(
          'Photo processing failed:',
          error
        );

        alert(
          'Unable to process one or more photos.'
        );

      } finally {

        event.target.value = '';

      }

    };


  /* =========================================================
     REMOVE PHOTO
  ========================================================= */

  const removePhoto =
    (index) => {

      setPhotos(
        (previous) =>
          previous.filter(
            (_, photoIndex) =>
              photoIndex !== index
          )
      );

    };


  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit =
    (event) => {

      event.preventDefault();


      /* PHOTO */

      if (photos.length === 0) {

        alert(
          'Please upload at least one property photo.'
        );

        return;

      }


      /* PINCODE */

      if (
        !/^\d{6}$/.test(
          formData.pincode
        )
      ) {

        alert(
          'Please enter a valid 6-digit pincode.'
        );

        return;

      }


      /* APARTMENT */

      if (isApartment) {

        if (
          !formData.apartmentName.trim()
        ) {

          alert(
            'Please enter the Apartment Name.'
          );

          return;

        }


        if (
          !formData.udsValue
        ) {

          alert(
            'Please enter the UDS Value.'
          );

          return;

        }

      }


      /* PG */

      if (isPG) {

        if (!formData.propertyName.trim()) {

          alert(
            'Please enter the PG / Hostel Name.'
          );

          return;

        }


        if (!formData.roomType) {

          alert(
            'Please select the room type.'
          );

          return;

        }

      }


      /* SHARED ROOM */

      if (isSharedRoom) {

        if (!formData.sharingType) {

          alert(
            'Please select the sharing type.'
          );

          return;

        }

      }


      setIsSubmitting(true);


      const propertyId =
        editId ||
        `user-${Date.now()}`;


      const beds =
        formData.bedrooms
          ? Number.parseInt(
              formData.bedrooms,
              10
            )
          : 0;


      const baths =
        formData.bathrooms
          ? Number.parseInt(
              formData.bathrooms,
              10
            )
          : 0;


      const location =
        [
          formData.locality,
          formData.city
        ]
          .filter(Boolean)
          .join(', ');


      /* =====================================================
         TITLE
      ===================================================== */

      let title;


      if (isApartment) {

        title =
          `${formData.apartmentName} - ${formData.bedrooms} BHK Apartment in ${formData.locality}`;

      } else if (isPG) {

        title =
          `${formData.propertyName} - PG / Hostel in ${formData.locality}`;

      } else if (isSingleRoom) {

        title =
          `Single Room in ${formData.locality}`;

      } else if (isSharedRoom) {

        title =
          `${formData.sharingType} Shared Room in ${formData.locality}`;

      } else if (isStudio) {

        title =
          `Studio Apartment in ${formData.locality}`;

      } else if (isServiceApartment) {

        title =
          `Service Apartment in ${formData.locality}`;

      } else {

        title =
          `${formData.propertyType} in ${formData.locality}`;

      }


      /* =====================================================
         PROPERTY OBJECT
      ===================================================== */

      const savedProperty = {

        id:
          propertyId,

        title,

        type:
          formData.propertyType,

        purpose:
          isRent
            ? 'Rent'
            : 'Sale',

        price:
          Number(formData.expectedPrice),

        location,

        city:
          formData.city,

        locality:
          formData.locality,

        pincode:
          formData.pincode,


        /* AREA */

        area:
          Number(
            formData.builtUpArea ||
            formData.plotArea ||
            0
          ),

        builtUpArea:
          isLand
            ? 0
            : Number(
                formData.builtUpArea ||
                0
              ),

        plotArea:
          (
            isApartment ||
            isRoomBasedRental ||
            isStudio ||
            isServiceApartment
          )
            ? 0
            : Number(
                formData.plotArea ||
                0
              ),

        udsValue:
          isApartment
            ? Number(
                formData.udsValue ||
                0
              )
            : 0,


        apartmentName:
          isApartment
            ? formData.apartmentName
            : '',


        propertyName:
          isPG
            ? formData.propertyName
            : '',


        /* RESIDENTIAL */

        beds,

        baths,

        propertyAge:
          formData.propertyAge,

        listedBy:
          formData.listedBy,

        facing:
          formData.facing,


        /* RENTAL */

        roomType:
          formData.roomType,

        sharingType:
          formData.sharingType,

        furnishedType:
          formData.furnishedType,

        foodAvailable:
          formData.foodAvailable,

        attachedBathroom:
          formData.attachedBathroom,

        genderPreference:
          formData.genderPreference,

        availableFrom:
          formData.availableFrom,

        currentOccupancy:
          formData.currentOccupancy
            ? Number(
                formData.currentOccupancy
              )
            : 0,

        totalCapacity:
          formData.totalCapacity
            ? Number(
                formData.totalCapacity
              )
            : 0,


        verified:
          false,

        description:
          formData.description,


        image:
          photos[0].dataUrl,

        images:
          photos.map(
            (photo) =>
              photo.dataUrl
          ),

        photoNames:
          photos.map(
            (photo) =>
              photo.name
          ),


        isUserPosted:
          true,


        createdAt:
          new Date().toISOString()

      };


      /* =====================================================
         SAVE
      ===================================================== */

      try {

        const existingProperties =
          JSON.parse(
            localStorage.getItem(
              STORAGE_KEY
            ) || '[]'
          );


        let updatedProperties;


        if (editId) {

          updatedProperties =
            existingProperties.map(
              (property) => {

                if (
                  String(property.id) ===
                  String(editId)
                ) {

                  return {

                    ...property,

                    ...savedProperty,

                    id:
                      property.id,

                    status:
                      property.status ||
                      'Active',

                    createdAt:
                      property.createdAt ||
                      savedProperty.createdAt

                  };

                }


                return property;

              }
            );


        } else {

          updatedProperties = [

            {
              ...savedProperty,

              status:
                'Active'

            },

            ...existingProperties

          ];

        }


        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            updatedProperties
          )
        );


        alert(
          isEditMode
            ? 'Property updated successfully.'
            : 'Property posted successfully.'
        );


        navigate(
          '/dashboard'
        );


      } catch (error) {

        console.error(
          'Unable to save property:',
          error
        );

        alert(
          'Unable to save the property. Please try again.'
        );

      } finally {

        setIsSubmitting(false);

      }

    };


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <main className="post-property-page">

      <section className="post-property-header">

        <div className="wrap narrow">

          <span className="eyebrow">

            {isEditMode
              ? 'EDIT PROPERTY'
              : 'POST PROPERTY'}

          </span>


          <h1>

            {isEditMode
              ? 'Edit your property'
              : 'Post your property'}

          </h1>


          <p>

            {isEditMode
              ? 'Update your property details and save your changes.'
              : 'Tell buyers or tenants what makes your property worth considering.'}

          </p>

        </div>

      </section>


      <section className="wrap narrow post-property-content">

        <form
          className="post-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              1. PROPERTY BASICS
          ================================================= */}

          <div className="form-section">

            <div className="form-section-heading">

              <div className="form-step">
                1
              </div>

              <div>

                <h2>
                  Property basics
                </h2>

                <p>
                  Tell us what you are listing.
                </p>

              </div>

            </div>


            <div className="form-grid">


              {/* LISTING TYPE */}

              <Field
                label="Listing Type"
                icon={<Home size={17} />}
              >

                <select
                  value={
                    formData.listingType
                  }
                  onChange={(event) =>
                    handleListingTypeChange(
                      event.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Select listing type
                  </option>

                  <option value="Sell">
                    Sell
                  </option>

                  <option value="Rent">
                    Rent
                  </option>

                </select>

              </Field>


              {/* PROPERTY TYPE */}

              <Field
                label="Property Type"
                icon={<Building2 size={17} />}
              >

                <select
                  value={propertyType}
                  onChange={(event) =>
                    handlePropertyTypeChange(
                      event.target.value
                    )
                  }
                  required
                >

                  <option value="">
                    Select property type
                  </option>


                  {isSell && (
                    <>

                      <option value="Apartment">
                        Apartment
                      </option>

                      <option value="Individual House">
                        Individual House
                      </option>

                      <option value="Villa">
                        Villa
                      </option>

                      <option value="Land">
                        Land
                      </option>

                    </>
                  )}


                  {isRent && (
                    <>

                      <option value="Apartment">
                        Apartment
                      </option>

                      <option value="Individual House">
                        Individual House
                      </option>

                      <option value="Villa">
                        Villa
                      </option>

                      <option value="PG / Hostel">
                        PG / Hostel
                      </option>

                      <option value="Single Room">
                        Single Room
                      </option>

                      <option value="Shared Room">
                        Shared Room
                      </option>

                      <option value="Studio Apartment">
                        Studio Apartment
                      </option>

                      <option value="Service Apartment">
                        Service Apartment
                      </option>

                    </>
                  )}

                </select>

              </Field>


              {/* PRICE */}

              <Field
                label={
                  isRent
                    ? 'Monthly Rent'
                    : 'Expected Price'
                }
                icon={
                  <IndianRupee size={17} />
                }
              >

                <input
                  type="number"
                  min="0"
                  value={
                    formData.expectedPrice
                  }
                  onChange={(event) =>
                    handleChange(
                      'expectedPrice',
                      event.target.value
                    )
                  }
                  placeholder={
                    isRent
                      ? 'Enter monthly rent'
                      : 'Enter expected price'
                  }
                  required
                />

              </Field>

            </div>


            {/* =================================================
                RENTAL-SPECIFIC BASIC FIELDS
            ================================================= */}

            {isPG && (

              <div className="form-grid">


                <Field label="PG / Hostel Name">

                  <input
                    value={
                      formData.propertyName
                    }
                    onChange={(event) =>
                      handleChange(
                        'propertyName',
                        event.target.value
                      )
                    }
                    placeholder="Enter PG / Hostel name"
                    required
                  />

                </Field>


                <Field label="Room Type">

                  <select
                    value={
                      formData.roomType
                    }
                    onChange={(event) =>
                      handleChange(
                        'roomType',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select room type
                    </option>

                    <option value="Single">
                      Single
                    </option>

                    <option value="Double Sharing">
                      Double Sharing
                    </option>

                    <option value="Triple Sharing">
                      Triple Sharing
                    </option>

                    <option value="Four Sharing">
                      Four Sharing
                    </option>

                  </select>

                </Field>


                <Field label="Gender Preference">

                  <select
                    value={
                      formData.genderPreference
                    }
                    onChange={(event) =>
                      handleChange(
                        'genderPreference',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select preference
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Unisex">
                      Unisex
                    </option>

                  </select>

                </Field>

              </div>

            )}


            {isSharedRoom && (

              <div className="form-grid">

                <Field label="Sharing Type">

                  <select
                    value={
                      formData.sharingType
                    }
                    onChange={(event) =>
                      handleChange(
                        'sharingType',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select sharing type
                    </option>

                    <option value="2 Sharing">
                      2 Sharing
                    </option>

                    <option value="3 Sharing">
                      3 Sharing
                    </option>

                    <option value="4 Sharing">
                      4 Sharing
                    </option>

                    <option value="5+ Sharing">
                      5+ Sharing
                    </option>

                  </select>

                </Field>


                <Field label="Gender Preference">

                  <select
                    value={
                      formData.genderPreference
                    }
                    onChange={(event) =>
                      handleChange(
                        'genderPreference',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select preference
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Unisex">
                      Unisex
                    </option>

                  </select>

                </Field>


                <Field label="Current Occupancy">

                  <input
                    type="number"
                    min="0"
                    value={
                      formData.currentOccupancy
                    }
                    onChange={(event) =>
                      handleChange(
                        'currentOccupancy',
                        event.target.value
                      )
                    }
                    placeholder="Enter current occupancy"
                  />

                </Field>


                <Field label="Total Capacity">

                  <input
                    type="number"
                    min="1"
                    value={
                      formData.totalCapacity
                    }
                    onChange={(event) =>
                      handleChange(
                        'totalCapacity',
                        event.target.value
                      )
                    }
                    placeholder="Enter total capacity"
                  />

                </Field>

              </div>

            )}


            {isSingleRoom && (

              <div className="form-grid">

                <Field label="Room Type">

                  <select
                    value={
                      formData.roomType
                    }
                    onChange={(event) =>
                      handleChange(
                        'roomType',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select room type
                    </option>

                    <option value="Private Room">
                      Private Room
                    </option>

                    <option value="Room with Attached Bathroom">
                      Room with Attached Bathroom
                    </option>

                    <option value="Room with Shared Bathroom">
                      Room with Shared Bathroom
                    </option>

                  </select>

                </Field>


                <Field label="Gender Preference">

                  <select
                    value={
                      formData.genderPreference
                    }
                    onChange={(event) =>
                      handleChange(
                        'genderPreference',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select preference
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Unisex">
                      Unisex
                    </option>

                  </select>

                </Field>

              </div>

            )}

          </div>


          {/* =================================================
              2. AREA
          ================================================= */}

          {(isSell ||
            isResidentialRental) &&
            !isPG &&
            !isSingleRoom &&
            !isSharedRoom && (

            <div className="form-section">

              <div className="form-section-heading">

                <div className="form-step">
                  2
                </div>

                <div>

                  <h2>
                    Property area
                  </h2>

                  <p>
                    Add the relevant property measurements.
                  </p>

                </div>

              </div>


              <div className="form-grid area-grid">


                {/* BUILT-UP */}

                {!isLand && (

                  <Field
                    label="Built-up Area"
                    hint="Constructed / covered area"
                  >

                    <div className="input-with-unit">

                      <input
                        type="number"
                        min="0"
                        value={
                          formData.builtUpArea
                        }
                        onChange={(event) =>
                          handleChange(
                            'builtUpArea',
                            event.target.value
                          )
                        }
                        placeholder="Enter built-up area"
                        required
                      />

                      <span>
                        sq.ft
                      </span>

                    </div>

                  </Field>

                )}


                {/* APARTMENT UDS */}

                {isApartment ? (

                  <Field
                    label="UDS Value"
                    hint="Undivided share of land"
                  >

                    <div className="input-with-unit">

                      <input
                        type="number"
                        min="0"
                        value={
                          formData.udsValue
                        }
                        onChange={(event) =>
                          handleChange(
                            'udsValue',
                            event.target.value
                          )
                        }
                        placeholder="Enter UDS value"
                        required
                      />

                      <span>
                        sq.ft
                      </span>

                    </div>

                  </Field>

                ) : (

                  <Field
                    label="Plot Area"
                    hint="Total land area"
                  >

                    <div className="input-with-unit">

                      <input
                        type="number"
                        min="0"
                        value={
                          formData.plotArea
                        }
                        onChange={(event) =>
                          handleChange(
                            'plotArea',
                            event.target.value
                          )
                        }
                        placeholder="Enter plot area"
                        required
                      />

                      <span>
                        sq.ft
                      </span>

                    </div>

                  </Field>

                )}

              </div>

            </div>

          )}


          {/* =================================================
              3. LOCATION
          ================================================= */}

          <div className="form-section">

            <div className="form-section-heading">

              <div className="form-step">
                3
              </div>

              <div>

                <h2>
                  Location
                </h2>

                <p>
                  Help buyers or tenants find your property.
                </p>

              </div>

            </div>


            <div className="form-grid">


              <Field
                label="City"
                icon={<MapPin size={17} />}
              >

                <input
                  value={
                    formData.city
                  }
                  onChange={(event) =>
                    handleChange(
                      'city',
                      event.target.value
                    )
                  }
                  placeholder="Enter city"
                  required
                />

              </Field>


              <Field label="Locality">

                <input
                  value={
                    formData.locality
                  }
                  onChange={(event) =>
                    handleChange(
                      'locality',
                      event.target.value
                    )
                  }
                  placeholder="Enter locality"
                  required
                />

              </Field>


              <Field label="Pincode">

                <input
                  value={
                    formData.pincode
                  }
                  onChange={(event) =>
                    handleChange(
                      'pincode',
                      event.target.value
                    )
                  }
                  placeholder="Enter pincode"
                  maxLength="6"
                  inputMode="numeric"
                  required
                />

              </Field>

            </div>

          </div>


          {/* =================================================
              4. DETAILS
          ================================================= */}

          <div className="form-section">

            <div className="form-section-heading">

              <div className="form-step">
                4
              </div>

              <div>

                <h2>
                  Property details
                </h2>

                <p>
                  Add important information about your listing.
                </p>

              </div>

            </div>


            {/* RESIDENTIAL DETAILS */}

            {(
              isApartment ||
              propertyType === 'Individual House' ||
              propertyType === 'Villa' ||
              isStudio ||
              isServiceApartment
            ) && (

              <div className="form-grid">


                {isApartment && (

                  <Field
                    label="Apartment Name"
                    icon={
                      <Building2 size={17} />
                    }
                  >

                    <input
                      value={
                        formData.apartmentName
                      }
                      onChange={(event) =>
                        handleChange(
                          'apartmentName',
                          event.target.value
                        )
                      }
                      placeholder="Enter apartment name"
                      required
                    />

                  </Field>

                )}


                <Field label="Bedrooms">

                  <select
                    value={
                      formData.bedrooms
                    }
                    onChange={(event) =>
                      handleChange(
                        'bedrooms',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select bedrooms
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4">
                      4
                    </option>

                    <option value="5+">
                      5+
                    </option>

                  </select>

                </Field>


                <Field label="Bathrooms">

                  <select
                    value={
                      formData.bathrooms
                    }
                    onChange={(event) =>
                      handleChange(
                        'bathrooms',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select bathrooms
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4+">
                      4+
                    </option>

                  </select>

                </Field>


                <Field label="Property Age">

                  <select
                    value={
                      formData.propertyAge
                    }
                    onChange={(event) =>
                      handleChange(
                        'propertyAge',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select property age
                    </option>

                    <option value="New / Under Construction">
                      New / Under Construction
                    </option>

                    <option value="0–1 Year">
                      0–1 Year
                    </option>

                    <option value="1–5 Years">
                      1–5 Years
                    </option>

                    <option value="5–10 Years">
                      5–10 Years
                    </option>

                    <option value="10–15 Years">
                      10–15 Years
                    </option>

                    <option value="15–20 Years">
                      15–20 Years
                    </option>

                    <option value="20+ Years">
                      20+ Years
                    </option>

                  </select>

                </Field>


                <Field label="Listed By">

                  <select
                    value={
                      formData.listedBy
                    }
                    onChange={(event) =>
                      handleChange(
                        'listedBy',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select listed by
                    </option>

                    <option value="Owner">
                      Owner
                    </option>

                    <option value="Broker">
                      Broker
                    </option>

                    <option value="Builder">
                      Builder
                    </option>

                  </select>

                </Field>


                <Field label="Facing">

                  <select
                    value={
                      formData.facing
                    }
                    onChange={(event) =>
                      handleChange(
                        'facing',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select facing
                    </option>

                    <option value="East">
                      East
                    </option>

                    <option value="West">
                      West
                    </option>

                    <option value="North">
                      North
                    </option>

                    <option value="South">
                      South
                    </option>

                    <option value="North-East">
                      North-East
                    </option>

                    <option value="North-West">
                      North-West
                    </option>

                    <option value="South-East">
                      South-East
                    </option>

                    <option value="South-West">
                      South-West
                    </option>

                  </select>

                </Field>

              </div>

            )}


            {/* PG / ROOM DETAILS */}

            {(
              isPG ||
              isSingleRoom ||
              isSharedRoom
            ) && (

              <div className="form-grid">


                <Field label="Furnished Type">

                  <select
                    value={
                      formData.furnishedType
                    }
                    onChange={(event) =>
                      handleChange(
                        'furnishedType',
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select furnishing
                    </option>

                    <option value="Fully Furnished">
                      Fully Furnished
                    </option>

                    <option value="Semi Furnished">
                      Semi Furnished
                    </option>

                    <option value="Unfurnished">
                      Unfurnished
                    </option>

                  </select>

                </Field>


                <Field label="Food Available">

                  <select
                    value={
                      formData.foodAvailable
                    }
                    onChange={(event) =>
                      handleChange(
                        'foodAvailable',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select option
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="No">
                      No
                    </option>

                  </select>

                </Field>


                <Field label="Attached Bathroom">

                  <select
                    value={
                      formData.attachedBathroom
                    }
                    onChange={(event) =>
                      handleChange(
                        'attachedBathroom',
                        event.target.value
                      )
                    }
                  >

                    <option value="">
                      Select option
                    </option>

                    <option value="Yes">
                      Yes
                    </option>

                    <option value="No">
                      No
                    </option>

                  </select>

                </Field>


                <Field label="Available From">

                  <input
                    type="date"
                    value={
                      formData.availableFrom
                    }
                    onChange={(event) =>
                      handleChange(
                        'availableFrom',
                        event.target.value
                      )
                    }
                  />

                </Field>

              </div>

            )}


            {/* DESCRIPTION */}

            <div className="description-field">

              <label>
                Description
              </label>

              <textarea
                rows="6"
                value={
                  formData.description
                }
                onChange={(event) =>
                  handleChange(
                    'description',
                    event.target.value
                  )
                }
                placeholder="Describe the property, amenities, nearby facilities, road access and other important details..."
                required
              />

            </div>

          </div>


          {/* =================================================
              5. PHOTOS
          ================================================= */}

          <div className="form-section">

            <div className="form-section-heading">

              <div className="form-step">
                5
              </div>

              <div>

                <h2>
                  Photos
                </h2>

                <p>
                  Add up to 10 property photos.
                </p>

              </div>

            </div>


            <div className="upload-box">

              <div className="upload-icon">

                <ImagePlus size={28} />

              </div>


              <strong>
                Upload property photos
              </strong>


              <span>
                JPG or PNG • Up to 10 photos
              </span>


              <label className="upload-button">

                <Upload size={17} />

                Choose Photos

                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  hidden
                  onChange={
                    handlePhotoUpload
                  }
                  disabled={
                    photos.length >= 10
                  }
                />

              </label>

            </div>


            {photos.length > 0 && (

              <div className="photo-preview-section">

                <div className="photo-preview-header">

                  <strong>
                    Property Photos
                  </strong>

                  <span>
                    {photos.length} / 10 photos
                  </span>

                </div>


                <div className="photo-preview-grid">

                  {photos.map(
                    (photo, index) => (

                      <div
                        className="photo-preview-card"
                        key={`${photo.name}-${index}`}
                      >

                        <img
                          src={
                            photo.dataUrl
                          }
                          alt={`Property ${index + 1}`}
                        />


                        <button
                          type="button"
                          className="remove-photo-btn"
                          onClick={() =>
                            removePhoto(index)
                          }
                        >
                          ×
                        </button>


                        {index === 0 && (

                          <span className="cover-photo-label">
                            Cover Photo
                          </span>

                        )}

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="submit-area">

            <div className="submission-note">

              <CheckCircle2 size={19} />

              <span>

                {isEditMode
                  ? 'Your existing property listing will be updated.'
                  : 'Your listing will be reviewed before publishing.'}

              </span>

            </div>


            <button
              className="primary submit-property-btn"
              type="submit"
              disabled={
                isSubmitting
              }
            >

              {isSubmitting

                ? (
                  isEditMode
                    ? 'Updating Property...'
                    : 'Saving Property...'
                )

                : (
                  isEditMode
                    ? 'Update Property'
                    : 'Submit Property'
                )

              }

            </button>

          </div>

        </form>

      </section>

    </main>

  );

}


/* =========================================================
   IMAGE COMPRESSION
========================================================= */

function compressImage(file) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        const image =
          new Image();


        image.onload = () => {

          const maxSize =
            1400;


          const scale =
            Math.min(
              1,
              maxSize /
                Math.max(
                  image.width,
                  image.height
                )
            );


          const canvas =
            document.createElement(
              'canvas'
            );


          canvas.width =
            Math.round(
              image.width * scale
            );


          canvas.height =
            Math.round(
              image.height * scale
            );


          const context =
            canvas.getContext('2d');


          if (!context) {

            reject(
              new Error(
                'Canvas is not supported.'
              )
            );

            return;

          }


          context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
          );


          resolve(
            canvas.toDataURL(
              'image/jpeg',
              0.78
            )
          );

        };


        image.onerror = () => {

          reject(
            new Error(
              'Invalid image.'
            )
          );

        };


        image.src =
          reader.result;

      };


      reader.onerror = () => {

        reject(
          new Error(
            'Unable to read image.'
          )
        );

      };


      reader.readAsDataURL(file);

    }
  );

}


/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  icon,
  hint,
  children
}) {

  return (

    <div className="form-field">

      <label>

        <span className="field-label">

          {icon && (

            <span className="field-icon">
              {icon}
            </span>

          )}

          {label}

        </span>


        {hint && (

          <small>
            {hint}
          </small>

        )}

      </label>


      {children}

    </div>

  );

}