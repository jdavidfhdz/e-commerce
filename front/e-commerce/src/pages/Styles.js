import Styled from 'styled-components';

const WelcomeWrapper = Styled.div`
    background-color: #fff;

    .container{
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        
        .title{
            h1{
                font-size: 20px;
                font-weight: normal;
                background: #f2f2f2;
                padding: 10px;
            }
        }
    
        span{
            &.version{
                font-size: 10px;
                text-align: right;
                width: 95%;
                display: inline-block;
                padding-bottom: 10px;
            }
        }
    }
    
`;

const ProvidersWrapper = Styled.div`

`;

export { WelcomeWrapper, ProvidersWrapper };