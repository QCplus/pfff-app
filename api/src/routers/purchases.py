from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.db.orm_db import get_session
from src.deps import get_repos_factory, oauth2_scheme
from src.models.Purchase import Purchase
from src.models.api.PurchasePost import PurchasePost
from src.services.PluginLoader import PluginLoader
from src.services.RepositoriesFactory import RepositoriesFactory


plugin_loader = PluginLoader('./plugins')
qr_code_processor = plugin_loader.load_qr_code_processor()

router = APIRouter(
    prefix='/purchases'
)


@router.post('/')
def add_purchase(item: PurchasePost,
                 factory: RepositoriesFactory = Depends(get_repos_factory),
                 session: Session = Depends(get_session),
                 token: str = Depends(oauth2_scheme)
                 ):
    factory.get_purchases_repository(session).add(item.to_db_model())


@router.post('/qrcode/{code}')
def add_from_qr_code(code: str,
                     factory: RepositoriesFactory = Depends(get_repos_factory),
                     session: Session = Depends(get_session),
                     token: str = Depends(oauth2_scheme)
                     ):
    data = qr_code_processor.process_qr_code(code=code)

    factory.get_purchases_repository(session).add_list([
        Purchase(price=t['price'],
                 name=t['name'],
                 quantity=t['quantity'],
                 payment_time=t['payment_time'],
                 shop=t['shop'],
                 category=t['category'])
        for t in data])


@router.get('/tags')
def get_all_tags(factory: RepositoriesFactory = Depends(get_repos_factory),
                 session: Session = Depends(get_session),
                 token: str = Depends(oauth2_scheme)
                 ):
    return factory.get_purchases_repository(session).get_all_tags()
