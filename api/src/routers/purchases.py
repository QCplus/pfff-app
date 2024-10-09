import datetime as dt
from typing import List, Optional
from fastapi import APIRouter, Depends, status, HTTPException

from src.deps import oauth2_scheme
from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.models.api.PurchaseModel import PurchaseModel
from src.models.api.PurchasePost import PurchasePost
from src.models.api.TableDataModel import TableDataModel
from src.repositories.abstract.IPurchasesRepository import IPurchasesRepository
from src.repositories.app_deps import get_purchases_repo
from src.deps import qr_code_processor


router = APIRouter(
    prefix='/purchases'
)


@router.post('')
def add(item: PurchasePost,
        repo: IPurchasesRepository = Depends(get_purchases_repo),
        _: str = Depends(oauth2_scheme)
        ) -> int:
    return repo.add(item.to_db_model())


@router.post('/qrcode/{code}')
def add_from_qr_code(code: str,
                     repo: IPurchasesRepository = Depends(get_purchases_repo),
                     _: str = Depends(oauth2_scheme)
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


@router.put('')
def update(purchase: PurchaseModel,
           repo: IPurchasesRepository = Depends(get_purchases_repo),
           _: str = Depends(oauth2_scheme)
           ) -> None:
    repo.update(purchase.to_dto())


@router.get('/tags')
def get_all_tags(repo: IPurchasesRepository = Depends(get_purchases_repo),
                 _: str = Depends(oauth2_scheme)
                 ) -> List[str]:
    tags = repo.get_all_tags()
    return tags


@router.get('/{purchase_id}')
def get_by_id(purchase_id: int,
              repo: IPurchasesRepository = Depends(get_purchases_repo),
              _: str = Depends(oauth2_scheme)
              ) -> Optional[PurchaseModel]:
    purchase = repo.get_by_id(purchase_id)

    if purchase is None:
        raise HTTPException(status.HTTP_204_NO_CONTENT,
                            f'No purchase with id {purchase_id}')

    return PurchaseModel.from_db(
        purchase
    )


@router.get('')
def get_by_interval(start: dt.datetime, end: dt.datetime,
                    repo: IPurchasesRepository = Depends(get_purchases_repo),
                    _: str = Depends(oauth2_scheme)
                    ) -> TableDataModel:
    return TableDataModel(rows=[PurchaseModel.from_db(p) for p in repo.get_by_interval(start, end)],
                          total=100)


@router.delete('/{purchase_id}')
def delete(purchase_id: int,
           repo: IPurchasesRepository = Depends(get_purchases_repo),
           _: str = Depends(oauth2_scheme)
           ) -> None:
    repo.remove(purchase_id)
