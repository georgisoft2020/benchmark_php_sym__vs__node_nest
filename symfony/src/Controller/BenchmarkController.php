<?php
// src/Controller/BenchmarkController.php
namespace App\Controller;

use App\Entity\BenchmarkItem;
use App\Repository\BenchmarkItemRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class BenchmarkController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private BenchmarkItemRepository $repository;

    public function __construct(
        EntityManagerInterface $entityManager,
        BenchmarkItemRepository $repository
    ) {
        $this->entityManager = $entityManager;
        $this->repository = $repository;
    }

    #[Route('/', name: 'app_index')]
    public function index(): JsonResponse
    {
        return new JsonResponse(['message' => 'Symfony Benchmark API']);
    }

    #[Route('/benchmark', name: 'app_benchmark')]
    public function benchmark(): JsonResponse
    {
        $startTime = microtime(true);

        // 10 reads
        $this->repository->findAll();
        $this->repository->find(1);
        $this->repository->findByName('item1');
        $this->repository->findAll();
        $this->repository->find(2);
        $this->repository->findByName('item2');
        $this->repository->findAll();
        $this->repository->find(3);
        $this->repository->findByName('item3');
        $this->repository->find(4);

        // 10 writes
        $randomStr = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, 6);
        
        for ($i = 1; $i <= 5; $i++) {
            $item = new BenchmarkItem();
            $item->setName("benchmark-{$randomStr}-{$i}");
            $item->setValue("Test value {$i}");
            $this->entityManager->persist($item);
        }
        
        for ($i = 1; $i <= 5; $i++) {
            $item = $this->repository->find($i);
            if ($item) {
                $item->setValue("Updated at " . (new \DateTime())->format('Y-m-d H:i:s'));
                $this->entityManager->persist($item);
            }
        }
        
        $this->entityManager->flush();

        $duration = (microtime(true) - $startTime) * 1000; // Convert to milliseconds

        return new JsonResponse(['duration' => $duration]);
    }
}