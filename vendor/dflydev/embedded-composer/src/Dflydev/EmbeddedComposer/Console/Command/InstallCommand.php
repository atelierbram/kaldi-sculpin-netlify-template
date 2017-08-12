<?php

/*
 * This file is a part of dflydev/embedded-composer.
 *
 * (c) Dragonfly Development Inc.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Dflydev\EmbeddedComposer\Console\Command;

use Composer\Installer;
use Composer\IO\ConsoleIO;
use Dflydev\EmbeddedComposer\Core\EmbeddedComposerAwareInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Install Command.
 *
 * @author Jordi Boggiano <j.boggiano@seld.be>
 * @author Ryan Weaver <ryan@knplabs.com>
 * @author Konstantin Kudryashov <ever.zet@gmail.com>
 * @author Beau Simensen <beau@dflydev.com>
 */
class InstallCommand extends Command
{
    public function __construct($commandPrefix = 'composer:')
    {
        $this->commandPrefix = $commandPrefix;
        parent::__construct();
    }

    protected function configure()
    {
        $fullCommand = $this->commandPrefix.'install';
        $this
            ->setName($fullCommand)
            ->setDescription('Install dependencies')
            ->setDefinition(array(
                new InputOption('prefer-source', null, InputOption::VALUE_NONE, 'Forces installation from package sources when possible, including VCS information.'),
                new InputOption('dry-run', null, InputOption::VALUE_NONE, 'Outputs the operations but will not execute anything (implicitly enables --verbose).'),
                new InputOption('dev', null, InputOption::VALUE_NONE, 'Enables installation of dev-require packages.'),
                new InputOption('no-scripts', null, InputOption::VALUE_NONE, 'Skips the execution of all scripts defined in composer.json file.'),
            ))
            ->setHelp(<<<EOT
The <info>{$fullCommand}</info> command reads a composer.json formatted file.
The file is read from the current directory. And installs its dependencies.

EOT
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        if (!$this->getApplication() instanceof EmbeddedComposerAwareInterface) {
            throw new \RuntimeException('Application must be instance of EmbeddedComposerAwareInterface');
        }

        $embeddedComposer = $this->getApplication()->getEmbeddedComposer();

        $io = new ConsoleIO($input, $output, $this->getApplication()->getHelperSet());
        $installer = $embeddedComposer->createInstaller($io);

        $installer
            ->setDryRun($input->getOption('dry-run'))
            ->setVerbose($input->getOption('verbose'))
            ->setPreferSource($input->getOption('prefer-source'))
            ->setDevMode($input->getOption('dev'))
            ->setRunScripts(!$input->getOption('no-scripts'))
        ;

        return $installer->run();
    }
}
