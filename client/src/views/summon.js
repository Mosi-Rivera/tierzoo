import {useEffect,lazy,Suspense} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import modal_enum from '../redux/other/modal_enum';

const Carousel          = lazy(() => import("react-bootstrap/Carousel"));
const CarouselCaption   = lazy(() => import("react-bootstrap/CarouselCaption"));
const CarouselItem      = lazy(() => import("react-bootstrap/CarouselItem"));
const ModalSummons      = lazy(() => import('../components/modals/modal_summons'));
export default function(props)
{
    const history = useHistory();
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const handle_single_summon = async () => {
        try
        {
            let result;
            if (inventory?.scrolls >= 1)
            {
                const {summon_single_scrolls} = await import('../api/routes/hero');
                const {inc_item} = await import('../redux/reducers/r_inventory');
                result = await summon_single_scrolls();
                dispatch(inc_item({key: 'scrolls', value: -1}));
            }
            else if (inventory?.gems >= 300)
            {
                const {summon_single_gems} = await import('../api/routes/hero');
                const {inc_item} = await import('../redux/reducers/r_inventory');
                result = await summon_single_gems();
                dispatch(inc_item({key: 'gems', value: -300}));
            }
            else
                return;
            const {set,set_summons} = await import('../redux/reducers/r_modals');
            dispatch(set_summons(result));
            dispatch(set(modal_enum.summons));
        }
        catch(err){}
    }
    const handle_multiple_sumon = async () => {
        try
        {
            let result;
            const {inc_item} = await import('../redux/reducers/r_inventory');
            if (inventory?.scrolls >= 10)
            {
                const {summon_multiple_scrolls} = await import('../api/routes/hero');
                const {inc_item} = await import('../redux/reducers/r_inventory');
                result = await summon_multiple_scrolls();
                dispatch(inc_item({key: 'scrolls', value: -10}));
            }
            else if (inventory?.gems >= 2700)
            {
                const {summon_multiple_gems} = await import('../api/routes/hero');
                const {inc_item} = await import('../redux/reducers/r_inventory');
                result = await summon_multiple_gems();
                dispatch(inc_item({key: 'gems', value: -2700}));
            }
            else
                return;
            const {set,set_summons} = await import('../redux/reducers/r_modals');
            dispatch(set_summons(result));
            dispatch(set(modal_enum.summons));
        }
        catch(err){}
    }
    useEffect(() => import('../helper').then(res => res.check_logged_in(history)),[]);
    return <div id='summons' className='pseudo-body'>
        <Suspense fallback={<div>loading</div>}>
            <ModalSummons/>
        </Suspense>
        <Suspense fallback={<div>loading</div>}>
            <Carousel>
                <CarouselItem>
                    <img
                    className="d-block w-100"
                    src="assets/shield_droid/Police Shielder.gif"
                    alt="First Summon Banner"
                    />
                    <CarouselCaption className='header'>
                        <h3 className='message'>
                            NEW epic hero <span className='epic'>Shield Droid</span>
                        </h3>
                    </CarouselCaption>
                    <CarouselCaption>
                        <div className='c-summon-button'>
                            <div>
                                <div onClick={handle_single_summon}>
                                    <span>single-summon</span>
                                </div>
                                <span>
                                    {
                                        inventory?.scrolls >= 1 ? 
                                        [<span className='icon scroll-icon' key={'scrolls-icon-single'}></span>,'1'] : 
                                        [<span className='icon gems-icon' key={'gems-icon-single'}></span>,'300']
                                    }
                                </span>
                            </div>
                            <div className='summon-button'>
                                <div onClick={handle_multiple_sumon}>
                                    <span>multi-summon</span>
                                </div>
                                <span>
                                    {
                                        inventory?.scrolls >= 10 ? 
                                        [<span className='icon scroll-icon' key={'scrolls-icon-multiple'}></span>, '10'] : 
                                        [<span className='icon gems-icon' key={'gems-icon-multiple'}></span>,'2700']
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='summon-info'>
                            Produces <span className='common'>Common</span> and <span className='epic'>Epic</span> heroes
                        </div>
                    </CarouselCaption>
                </CarouselItem>
            </Carousel>
        </Suspense>
    </div>
}