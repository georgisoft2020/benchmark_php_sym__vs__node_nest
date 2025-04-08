<?php
// src/Repository/BenchmarkItemRepository.php
namespace App\Repository;

use App\Entity\BenchmarkItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class BenchmarkItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BenchmarkItem::class);
    }

    public function findByName(string $name): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.name = :name')
            ->setParameter('name', $name)
            ->getQuery()
            ->getResult();
    }
}