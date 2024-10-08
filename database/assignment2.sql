INSERT INTO public.account (
                            account_firstname, account_lastname, account_email, account_password
) VALUES ( 'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n'
                                                                                                         );
UPDATE public.account SET account_type = 'Admin' WHERE account_id = 1;

DELETE FROM public.account WHERE account_id = 1;

UPDATE public.inventory SET inv_description = replace(inv_description, 'small interiors', 'a huge interior') WHERE inv_id = 10;

SELECT inv_make, inv_model, classification_name FROM inventory inner join classification on inventory.classification_id = classification.classification_id WHERE inventory.classification_id = 2;

UPDATE public.inventory SET inv_image = replace(inv_image, '/images' , '/images/vehicles') , inv_thumbnail = replace(inv_thumbnail, '/images' , '/images/vehicles');