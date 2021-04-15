import './Bots.css'


import HeaderBots from '../components/header/headerBots'
import Footer from '../components/footer/footer'

import PreviousSales from '../components/list-panels/previousSales'

import { Line } from 'react-chartjs-2'

/*

bannerColor                 -str hex code of the background color
bannerTextColor             -str hex code of the text color
bannerIconUrl               -str
bannerBackgroundUrl         -str        (uncomment when assets are ready from database)

botName                     -str
lastSale                    -str

*/

function BotsExpand(props) {

    return(
        <>
            <div className="bots_header-container">
                <HeaderBots />
            </div>
            <div className="bots_expand-header_banner" style={{backgroundColor:`${props.bannerColor}` /*,backgroundImage:`url(${props.bannerBackgroundUrl})`*/}}>
                <div className="bots_expand-header_container">
                    <div className="bots_expand-header_icon" style={{backgroundImage:`url(${props.bannerIconUrl})`}}></div>
                    <h4 className="bots_title" style={{color:`${props.bannerTextColor}`}}>{props.botName}</h4>
                </div>
                <div className="bots_expand-header_last-sale_container">
                    <p className="last_sale_text">Last Sale</p>
                    <h5 className="last_sale_text">{props.lastSale}</h5>
                </div>
            </div>

            <div className="bots_expand-graph_panel">
                <div className="bots_expand-graph_panel-header">
                    <p className="graph_nav_text">Year</p>
                    <p className="graph_nav_text">Month</p>
                    <p className="graph_nav_text">Week</p>
                    <p className="graph_nav_text">Day</p>
                </div>

                <div className="bots_expand-graph_panel-divider"></div>

                <div className="bots_expand-graph_panel-legend">
                    <div className="bots_expand-graph_panel-legend-title">
                        <h6 className="graph_light_title">Splash Market</h6>
                        <h4 className="graph_normal_title">{props.botName}</h4>
                    </div>

                    <div className="bots_expand-graph_panel-legend-legend">
                        <div className="bots_expand-graph_panel-legend-container">
                            <div className="bots_expand-graph_panel-legend_rectangle" style={{backgroundColor:"#27AAF7"}}></div>
                            <p className="graph_light_text">Renewal</p>
                        </div>
                        
                        <div className="bots_expand-graph_panel-legend-container">
                            <div className="bots_expand-graph_panel-legend_rectangle" style={{backgroundColor:"#FB4056"}}></div>
                            <p className="graph_light_text">Lifetime</p>
                        </div>
                    </div>

                </div>

                <div className="bots_expand-graph_panel-graph">
                    <Line 
                        data={{
                            labels:['Mar 26','Mar 27','Mar 28','Mar 29','Mar 30','Mar 31'],
                            datasets:[
                                {
                                    label:'Renewal',
                                    data: [7000,6500,6600,6700,7000,7100],
                                    backgroundColor:['transparent'],
                                    borderColor:['#27AAF7']
                                },
                                {
                                    label:'Lifetime',
                                    data: [6700,5900,6100,6200,6100,7400],
                                    backgroundColor:['transparent'],
                                    borderColor:['#FB4056']
                                }
                            ]
                        }}

                        options={{
                            legend: {display:false},
                            tooltips: {enabled:false},
                            responsive: true,
                            scales:{
                                xAxes:[{
                                    display:true,
                                    gridLines:{
                                        color:"#303046"
                                    },
                                    ticks:{
                                        fontSize:16,
                                        fontColor:"#BFC3D3"
                                    }
                                }],
                                yAxes:[{
                                    display:true,
                                    gridLines:{
                                        color:"#303046"
                                    },
                                    scaleLabel: {
                                        display:true,
                                        labelString:'Price (USD)',
                                        fontSize:18,
                                        fontColor:"#BFC3D3"
                                    },
                                    ticks:{
                                        fontSize:16,
                                        
                                        fontColor:"#BFC3D3",
                                        autoSkip: true,
                                        maxTicksLimit: 6,
                                    }
                                }]
                                
                            }
                        }}
                    />
                </div>

            
            </div>

            <div className="bots_expand-previous_sales_panel">
                <p className="previous_sales_text">Previous sales</p>
                
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Price</th>
                    </tr>
                </table>
                
                <div className="bots_expand-previous_sales_container">
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Monthly" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                    <PreviousSales date="December 24, 2020" type="Lifetime" price="$7000"/>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default BotsExpand;