import {gql} from "apollo-boost";

export const FETCH_CATEGORIES = gql`
    {
        categoriesOne {
            id
            name
            imageUrl
            orderOfDisplay
        }
    }
`;


export const FETCH_SECOND_CATEGORIES = gql`
    {
        categoriesTwo {
            id
            name
            imageUrl
            orderOfDisplay
            categoryOne {
                id
                name
            }
        }
    }
`;

export const FETCH_PRODUCTS = gql`
    query allProducts($productId: ID){
        allProducts(productId: $productId){
            id
            name
            description
            categoryOne{
                id
                imageUrl
                name
                orderOfDisplay
            }
            categoryTwo{
                id
                imageUrl
                name
                orderOfDisplay
                categoryOne{
                    id
                    imageUrl
                    name
                    orderOfDisplay
                }
            }
            price
            favorite
            weight
            purity
            gender
            size
            isOnDiscount
            isHallmark
            isHidden
            images
            isFeatured
            isTrending
        }
    }
`;

export const VALID_FILTERS = gql`
    {
        filters{
            categoriesOne{
                id
                name
            }
            categoriesTwo{
                id
                name
            }
            gender
            purity
            size
            weight
        }
    }
`;

export const FILTER_PRODUCTS = gql`
    query filterProduct(
        $productId:[ID]
        $categoriesOne: [ID]
        $categoriesTwo: [ID]
        $price: [Float]
        $weight: [String]
        $purity: [String]
        $gender: [String]
        $size: [String]
        $isHallmark: Boolean
        $isFeatured: Boolean
        $isTrending: Boolean
    ){
        filterProduct(
            productId:$productId
            categoriesOne:$categoriesOne
            categoriesTwo:$categoriesTwo
            price:$price
            weight:$weight
            purity:$purity
            gender:$gender
            size:$size
            isHallmark:$isHallmark
            isFeatured:$isFeatured
            isTrending:$isTrending
        ){
            id
            name
            description
            categoryOne{
                id
                imageUrl
                name
                orderOfDisplay
            }
            categoryTwo{
                id
                imageUrl
                name
                orderOfDisplay
                categoryOne{
                    id
                    imageUrl
                    name
                    orderOfDisplay
                }
            }
            price
            favorite
            weight
            purity
            gender
            size
            isOnDiscount
            isHallmark
            isHidden
            images
            isFeatured
            isTrending
        }
    }
`;

export const FETCH_MISC = gql`
    query findMisc($key:[ID]!){
        findMisc(key: $key){
            value
        }
    }
`;
