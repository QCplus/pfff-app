from typing import List, Optional
from fastapi import APIRouter, Depends, status, HTTPException

from src.deps import oauth2_scheme
from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.models.api.PurchaseModel import PurchaseModel
from src.models.api.PurchasePost import PurchasePost
from src.repositories.abstract.IPurchasesRepository import IPurchasesRepository
from src.repositories.app_deps import get_purchases_repo
from src.deps import qr_code_processor


router = APIRouter(
    prefix='/purchases'
)


@router.post('/')
def add(item: PurchasePost,
        repo: IPurchasesRepository = Depends(get_purchases_repo),
        token: str = Depends(oauth2_scheme)
        ) -> int:
    return repo.add(item.to_db_model())


@router.post('/qrcode/{code}')
def add_from_qr_code(code: str,
                     repo: IPurchasesRepository = Depends(get_purchases_repo),
                     token: str = Depends(oauth2_scheme)
                     ):
    data = qr_code_processor.process_qr_code(code=code)

    repo.add_list([
        NewPurchaseDto(
            price=t['price'],
            name=t['name'],
            quantity=t['quantity'],
            payment_time=t['payment_time'],
            shop=t['shop'],
            category=t['category'])
        for t in data])


@router.put('/')
def update(purchase: PurchaseModel,
           repo: IPurchasesRepository = Depends(get_purchases_repo),
           token: str = Depends(oauth2_scheme)
           ) -> None:
    repo.update(purchase.to_dto())


@router.get('/tags')
def get_all_tags(repo: IPurchasesRepository = Depends(get_purchases_repo),
                 token: str = Depends(oauth2_scheme)
                 ) -> List[str]:
    tags = repo.get_all_tags()
    return tags


@router.get('/{id}')
def get_by_id(id: int,
              repo: IPurchasesRepository = Depends(get_purchases_repo),
              token: str = Depends(oauth2_scheme)
              ) -> Optional[PurchaseModel]:
    purchase = repo.get_by_id(id)

    if purchase is None:
        raise HTTPException(status.HTTP_204_NO_CONTENT, f'No purchase with id {id}')

    return PurchaseModel.from_db(
        purchase
    )
